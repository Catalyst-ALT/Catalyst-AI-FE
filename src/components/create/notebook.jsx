import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const Notebook = () => {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
    <div>
    <button className="h-10 p-2 w-20 border m-2 justify-center"onClick={log}>Save</button>
    <div>
      <Editor
        apiKey='5c49z6msz9y26e8fv03ptpphkxydj6nybm6x070w4arrr81l'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>Take notes ... </p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
</div>
     
      </div>
    </>
  );
};

export default Notebook;
