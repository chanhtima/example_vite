import { useState } from "react";
import Editors from "../components/Editors/Editors";
import EditorCk from "../components/Editors/EditorCk";

export default function page() {
  const [text, setText] = useState('');
  const [textCk, setTextCk] = useState('');

  return (
    <div >
      <div className='mb-12 '>
        <div className="flex justify-center items-center mb-4">
          <div className="text-xl font-extrabold">Qull.Js Text Editor</div>
        </div>
        <Editors
          data={text}
          setData={setText}
        />
        <div className=' h-28 border my-2 pt-1 max-h-28 overflow-y-auto'>
          <h2 className="text-xl font-bold flex justify-center">Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
      </div>
      <div className=' max-lg:max-w-xl'>
        <div className="flex justify-center items-center mb-4">
          <div className="text-xl font-extrabold"> Ck5 Text Editor</div>
        </div>
        <EditorCk
          data={textCk}
          setData={setTextCk}
        />

        <div className=' h-[40rem] border my-2 pt-1  overflow-y-auto ck-content'>
          <h2 className="text-xl font-bold flex justify-center">Preview Ck5</h2>
          <div dangerouslySetInnerHTML={{ __html: textCk }} className='p-2'></div>
        </div>
      </div>

    </div>
  )
}