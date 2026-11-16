import { createClient } from "../supabase/client";

const supabase = createClient()

async function normalizeImageBlob(
  file: File,
  width = 256,
  height = 256
): Promise<Blob> {
  const img = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;
  const scale = Math.max(width / img.width, height / img.height);
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;
  const offsetX = (width - scaledWidth) / 2;
  const offsetY = (height - scaledHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas conversion failed'))),
      'image/webp',
      0.85
    );
  });
}

export async function uploadOrReplaceNormalizedToSupabase(file: File, bucket:string, oldFilepath?:string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user){ 
    if (!user) throw new Error("Not authenticated");
  }
  const normalizedBlob = await normalizeImageBlob(file, 256, 256);

     const fileName = `${crypto.randomUUID()}.webp`;
 
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, normalizedBlob, {
      contentType: 'image/webp',
      upsert: false,
    });
  if 
  (error) {
    throw error;
  }
  if(oldFilepath){
    await supabase.storage.from(bucket).remove([oldFilepath])
  }
  const { data:dataImg } = await supabase.storage
    .from(bucket)
    .getPublicUrl( data.path)
   await supabase.from("profiles").update({"avatar_url":dataImg.publicUrl}).eq("id",user?.id).select().single();
  return  dataImg.publicUrl
  
}