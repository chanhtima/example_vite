import  { useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold, Code, Strikethrough, Subscript, Superscript, 
    Underline, Essentials, Italic, Mention, Paragraph, 
    Undo, Font, Image, ImageUpload, AutoLink, Link, Heading, 
    HtmlEmbed, HorizontalLine, List, Autoformat, ListProperties, 
    Indent, IndentBlock, Alignment, ImageResizeEditing, ImageResizeHandles ,
    ImageCaption, 
    SimpleUploadAdapter,
    ImageToolbar,
    ImageStyle
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { EditorProps } from '../../models/editors.model';


class MyUploadAdapter {
    loader: any;
    reader: FileReader;

    constructor(loader: any) {
        this.loader = loader;
        this.reader = new FileReader();
    }

    upload() {
        return this.loader.file
            .then((file: File) => new Promise((resolve, reject) => {
                if (file.size > 1 * 1024 * 1024) {
                    reject(`ขนาดไฟล์เกิน 5 MB`);
                    return;
                }
                this.reader.onload = () => {
                    resolve({ default: this.reader.result as string });
                };
                this.reader.onerror = (error) => {
                    reject(error);
                };
                this.reader.readAsDataURL(file);
            }));
    }

    abort() {
        this.reader.abort();
    }
}

function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new MyUploadAdapter(loader);
    };
}




export default function EditorCk({
    data = [],
    setData
}: EditorProps) {
    const editorRef = useRef<any>(null);
    const handleChange = (_e: any, editor: any) => {
        const data = editor.getData()
        console.log(data);
        setData(data)
    }
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.editor.setData(data);
        }
    }, [data]);
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            config={{
                fontSize: {
                    options: [
                        10, 12, 14, 16, 18, 20, 24, 28, 36
                    ]
                },
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                    ]
                },
                toolbar: {
                    items: ['undo', 'redo', '|', 'heading',
                        'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript', '|'
                        , 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
                         'imageUpload','link', 'htmlEmbed', 'horizontalLine', 'bulletedList', 'numberedList','|',
                          'outdent', 'indent', 'alignment','resizeImage'],
                },

                plugins: [Font, Bold, Code, Strikethrough, Subscript, Superscript, Underline,
                     Essentials, Italic, Mention, Paragraph, Undo, Image, ImageUpload,
                    Link, AutoLink, Heading, HtmlEmbed, HorizontalLine, List, Autoformat,
                     ListProperties, Indent, IndentBlock,  ImageResizeEditing, ImageResizeHandles,
                    Alignment,ImageCaption ,SimpleUploadAdapter,ImageToolbar, ImageToolbar, ImageCaption, ImageStyle,Heading,
                ],

                extraPlugins: [MyCustomUploadAdapterPlugin],
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                },
                image: {
                    toolbar: [
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        '|',
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'resizeImage'
                    ],
                    upload: {
                        types: ['png', 'jpg', 'jpeg', 'gif'],

                    },
                    resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            value: null,
                            label: 'Original'
                        },
                        {
                            name: 'resizeImage:custom',
                            label: 'Custom',
                            value: 'custom'
                        },
                        {
                            name: 'resizeImage:40',
                            value: '40',
                            label: '40%'
                        },
                        {
                            name: 'resizeImage:60',
                            value: '60',
                            label: '60%'
                        }
                    ]
                    
                },
         
                list: {
                    properties: {

                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                }

            }}
            onChange={handleChange}


        />
    )
}