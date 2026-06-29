import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const staticDir = path.resolve(process.cwd(), 'public/media')

export async function uploadToCloudinary(
  filename: string,
  publicId: string,
): Promise<string | null> {
  const filePath = path.join(staticDir, filename)
  if (!fs.existsSync(filePath)) return null

  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    overwrite: true,
    resource_type: 'auto',
  })
  return result.secure_url
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch {
    // ignore if not found
  }
}

// Derives a stable Cloudinary public_id from the media doc id
export const cldPublicId = (docId: string | number) => `cms-media/${docId}`
export const cldSizePublicId = (docId: string | number, size: string) =>
  `cms-media/${docId}-${size}`
