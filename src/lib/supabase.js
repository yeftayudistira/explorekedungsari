import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Automatically compress image on client-side before uploading.
 * Resizes max dimension to 1200px and encodes to WebP format (quality 80%).
 * Turns 5MB - 10MB camera photos into crisp ~150KB - 250KB WebP images!
 */
export async function compressImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
  if (!file || !file.type || !file.type.startsWith('image/')) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const compressedFile = new File([blob], cleanName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

/**
 * Upload an image file to Supabase Storage bucket with auto-compression.
 * 
 * @param {File} file - The file object from <input type="file">
 * @param {string} bucketName - Supabase Storage bucket name (default: 'desa-images')
 * @returns {Promise<string>} Public URL of the compressed image
 */
export async function uploadImage(file, bucketName = 'desa-images') {
  if (!file) return null;

  try {
    // 1. Auto Compress File Client-Side
    const targetFile = await compressImage(file);

    // 2. Upload to Supabase Storage if configured
    if (isSupabaseConfigured() && supabase) {
      const fileExt = targetFile.name.split('.').pop() || 'webp';
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, targetFile, {
          cacheControl: '31536000',
          upsert: false,
          contentType: targetFile.type || 'image/webp'
        });

      if (error) {
        console.warn('Supabase storage upload failed, falling back to local Base64:', error.message);
      } else if (data) {
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    }

    // Fallback: Read compressed image as Base64 Data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(targetFile);
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    throw err;
  }
}
