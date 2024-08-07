
import { Editor } from "primereact/editor";
import { EditorProps } from "../../models/editors.model";


export default function Editors({
    data=[], 
    setData
}:EditorProps) {
 
     console.log("test",data);

     
    return (
        <div className="card">
            <Editor 
                value={data} 
                onTextChange={(e) => setData(e.htmlValue || '')} 
                style={{ height: '320px' }} 
                

            />
        </div>
    )
}
