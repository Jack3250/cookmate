import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TextEditor({ value, onChange }) {
  return (
    <Editor
      tinymceScriptSrc={'/tinymce/tinymce.min.js'} 
      
      // 초기값 및 변경 핸들러
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      
      // 에디터 초기화 설정
      init={{
        license_key: 'gpl',
        height: 500,
        menubar: true, // 상단 메뉴바
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'fontfamily fontsize | bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family: "Noto Sans KR", sans-serif; font-size: 14px }',
        
        // 스킨과 아이콘 경로를 public 폴더로 강제 지정
        skin_url: '/tinymce/skins/ui/oxide',
        content_css: '/tinymce/skins/content/default/content.min.css',
      }}
    />
  );
}

export default TextEditor;