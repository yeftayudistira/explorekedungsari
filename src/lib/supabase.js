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
 * Upload an image file to Supabase Storage bucket.
 * If Supabase is not configured or upload fails, fallback to Base64 Data URL.
 * 
 * @param {File} file - The file object from <input type="file">
 * @param {string} bucketName - Supabase Storage bucket name (default: 'desa-images')
 * @returns {Promise<string>} Public URL or Base64 Data URL of the image
 */
export async function uploadImage(file, bucketName = 'desa-images') {
  if (!file) return null;

  // Attempt Supabase Storage Upload if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
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
    } catch (err) {
      console.warn('Error during Supabase upload:', err);
    }
  }

  // Fallback: Read as Base64 Data URL for local testing
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
