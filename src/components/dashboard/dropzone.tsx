import { UploadDropzone } from '@/utils/uploadthing'

export function Dropzone() {
  return (
    <>
      <UploadDropzone
        endpoint="pdfUploader"
        className="ut-button:w-full ut-button:text-lime-800 ut-button:border-lime-300 ut-button:border ut-button:bg-lime-100 ut-button:hover:bg-lime-200 ut-button:text-sm ut-button:mx-0 ut-button:h-9 ut-button:rounded-md ut-button:px-2 ut-button:py-2 ut-button:font-medium ut-button:ring-0 ut-upload-icon:hidden ut-allowed-content:hidden ut-label:font-normal"
      />
    </>
  )
}
