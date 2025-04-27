import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { auth } from '@clerk/nextjs/server'

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: '16MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      try {
        const { userId } = await auth()

        if (!userId) throw new UploadThingError('Unauthorized')

        return { userId }
      } catch (error) {
        console.error('Middleware error:', error)
        throw new UploadThingError('Authentication failed')
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl }
      } catch (error) {
        console.error('onUploadComplete error:', error)
        return { error: 'Failed to process upload' }
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
