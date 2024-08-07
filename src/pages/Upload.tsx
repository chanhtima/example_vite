import  { useState } from 'react';
import UploadFile from '../components/Upload/UploadFile';

export default function Upload() {

    const [files, setFiles] = useState<File[]>([]);
    const [files2, setFiles2] = useState<File[]>([]);
    const [files3, setFiles3] = useState<File[]>([]);
    console.log(files);
    return (
        <>
            <div>Upload</div>
            <div className=' space-y-4'>
                <div>
                    <UploadFile files={files} setFiles={setFiles} />
                </div>
                <div>
                    <UploadFile files={files2} setFiles={setFiles2} advanced />
                </div>
                <div>
                    {/* เพิ่ม ที่ละหลายรูป */}
                    <UploadFile files={files3} setFiles={setFiles3} advanced multiple />
                </div>
            </div>
        </>
    );
}
