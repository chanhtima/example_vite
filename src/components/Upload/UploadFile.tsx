import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

import { Image } from 'primereact/image';
import { UploadFileProps } from '../../models/FileUpload.model';

export default function UploadFile({
    files = [],
    setFiles,
    advanced = false,
    disabled = false,
    multiple = false,
    maxSize = 1000000,
}: UploadFileProps) {
    const toast = useRef<Toast>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        if (disabled) return;

        let _totalSize = totalSize;
        let newFiles = [...files, ...e.files];

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        setFiles(newFiles);
        toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateUpload = (e: FileUploadUploadEvent) => {
        if (disabled) return;

        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file: File, callback: Function) => {
        if (disabled) return;

        const updatedFiles = files.filter((f) => f !== file);
        setTotalSize(totalSize - file.size);
        setFiles(updatedFiles);
        callback();
    };

    const onTemplateClear = () => {
        if (disabled) return;

        setTotalSize(0);
        setFiles([]);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton } = options;
        const value = totalSize / 10000;
        const formattedValue = fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={`${className} bg-transparent flex items-center`}>
                {chooseButton}
                <div className="flex items-center gap-3 ml-auto">
                    <span>{formattedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }} />
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
        const objectURL = URL.createObjectURL(file);

        return (
            <div className="flex items-center justify-between space-x-3">
                <div className="flex items-center">
                    <Image src={objectURL} alt={file.name} width={"100"} preview />
                    <span className="flex flex-col text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                    <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                </div>
                <Button
                    type="button"
                    icon="pi pi-times"
                    className={`p-button-outlined p-button-rounded p-button-danger ${disabled ? 'p-button-disabled' : ''}`}
                    onClick={() => onTemplateRemove(file, props.onRemove)}
                    disabled={disabled}
                />
            </div>
        );
    };

    const emptyTemplate = () => (
        <div className="flex items-center flex-col">
            <i className="pi pi-image mt-3 p-5 text-5xl rounded-full bg-gray-200 text-gray-600" />
            <span className="text-xl text-gray-500 my-5">Drag and Drop Image Here</span>
        </div>
    );

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: `custom-choose-btn p-button-rounded p-button-outlined ${disabled ? 'p-button-disabled' : ''}`,
    };

    return (
        <div>
            <Toast ref={toast} />

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />

            {advanced ? (
                <FileUpload
                    ref={fileUploadRef}
                    name="demo[]"
                    url="/api/upload"
                    multiple={multiple}
                    accept="image/*"
                    maxFileSize={maxSize}
                    onUpload={onTemplateUpload}
                    onSelect={onTemplateSelect}
                    onError={onTemplateClear}
                    onClear={onTemplateClear}
                    headerTemplate={headerTemplate}
                    itemTemplate={itemTemplate}
                    emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions}
                    disabled={disabled}
                />
            ) : files.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between space-x-3">
                            <div className="flex items-center">
                                <Image src={URL.createObjectURL(file)} alt={file.name} width={"100"} preview />
                                <span className="flex flex-col text-left ml-3">
                                    {file.name}
                                    <small>{new Date().toLocaleDateString()}</small>
                                </span>
                            </div>
                            <Button
                                type="button"
                                icon="pi pi-times"
                                className={`p-button-outlined p-button-rounded p-button-danger ${disabled ? 'p-button-disabled' : ''}`}
                                onClick={() => onTemplateRemove(file, () => { })}
                                disabled={disabled}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <FileUpload
                    mode="basic"
                    name="demo[]"
                    url="/api/upload"
                    accept="image/*"
                    maxFileSize={maxSize}
                    onSelect={onTemplateSelect}
                    disabled={disabled}
                />
            )}
        </div>
    );
}
