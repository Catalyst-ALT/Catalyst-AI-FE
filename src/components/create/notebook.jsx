import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const CreativeWritingSave = ({ postId }) => {

  const [note, setNote] = useState("");

  const handlePatch = (e) => {
    e.preventDefault();
    axios
      .patch(`https://catalyst-x226.onrender.com/api/response/write/${postId}`, {
        note: editorRef.current.getContent(),
      })
      .then((response) => {
        setNote(response.data.note);
      })
      .catch((error) => console.error(error));
  };
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

console.log(postId)
  return (
    <>
    <div>
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

export default CreativeWritingSave;
