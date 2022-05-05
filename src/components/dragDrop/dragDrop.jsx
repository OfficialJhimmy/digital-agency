import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange2 = file => {
    setFile(file);
  };
  return (
    <FileUploader 
        handleChange={handleChange2} 
        name="file" 
        // types={fileTypes} 
    />
  );
}

export default DragDrop;