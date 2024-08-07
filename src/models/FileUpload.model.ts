export interface UploadFileProps {
    files?: File[];
    setFiles: (files: File[]) => void;
    advanced?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    maxSize?: number;
  }
  