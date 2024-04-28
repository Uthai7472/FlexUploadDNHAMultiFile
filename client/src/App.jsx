import { useState } from "react";
import React from 'react';
import axios from 'axios';

const App = () => {

  const [files, setFiles] = useState([]);
  const [fileIndexes, setFileIndexes] = useState([]);

  const handleFileChange = (file, index) => {
    const newFiles = [...files];
    const newFileIndexes = [...fileIndexes];

    newFiles[index] = file;
    newFileIndexes[index] = index;

    setFiles(newFiles);
    setFileIndexes(newFileIndexes);
  };

  const handleSubmit = async () => {
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file && !isNaN(fileIndexes[index])) {
          const formData = new FormData();
          formData.append('files', file);
          formData.append('index', fileIndexes[index]); // Ensure index is parsed as an integer
          console.log(`File index: ${fileIndexes[index]}`);
          
          if (fileIndexes[index] >= 1 && fileIndexes[index] <= 4) {
            await axios.post('http://localhost:3000/upload/seatleak', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          } else if (fileIndexes[index] === 5) {
            
            await axios.post('http://localhost:3000/upload/body', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          } else if (fileIndexes[index] === 6) {
            
            await axios.post('http://localhost:3000/upload/needle', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          } else {
            console.log('Error index files');
          }
      }
    }
 
      console.log('Files uploaded successfully');

    } catch (error) {
      console.log('Error uploading files: ', error);
    }
    
  }

  return (
    <div>
      {/* {Array.from({ length: 6 }).map((_, index) => (
        <FileUpload id={index} index={index} onFileChange={handleFileChange} />
      ))} */}
      <FileUpload index={1} onFileChange={handleFileChange}/>
      <FileUpload index={2} onFileChange={handleFileChange}/>
      <FileUpload index={3} onFileChange={handleFileChange}/>
      <FileUpload index={4} onFileChange={handleFileChange}/>
      <FileUpload index={5} onFileChange={handleFileChange}/>
      <FileUpload index={6} onFileChange={handleFileChange}/>
      <button onClick={handleSubmit}>Submit</button>
      
    </div>
  )
}

const FileUpload = ({ index, onFileChange }) => {
  const handleChange = (e) => {
    onFileChange(e.target.files[0], index);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  )
}

export default App