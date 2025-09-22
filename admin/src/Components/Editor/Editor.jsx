import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const BlogEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js" // load TinyMCE offline từ public
      value={value}
      onEditorChange={onChange}
      init={{
        height: 500,
        menubar: true,
        license_key: "gpl", // chấp nhận GPL offline
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic underline strikethrough | " +
          "fontfamily fontsize | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | help | code | image | table",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
};

export default BlogEditor;
