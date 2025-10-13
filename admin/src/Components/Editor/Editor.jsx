import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const BlogEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="u6m1schc87513iuu5hwda3jkp3qge8mc8ebadlw2aapve65o"
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

        // ✅ Cho phép chọn ảnh từ máy
        file_picker_types: "image",
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          input.onchange = function () {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = function () {
              const id = "blobid" + new Date().getTime();
              const blobCache =
                window.tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              // Trả URL ảnh base64 cho editor
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
      }}
    />
  );
};

export default BlogEditor;
