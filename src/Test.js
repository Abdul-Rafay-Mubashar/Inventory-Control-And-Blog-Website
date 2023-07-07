import React, { useState } from "react";

function Test() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit =async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Img", selectedFile);

    const Response=await  fetch('http://localhost:5000/api/Image/upload', {
        method: 'post',
        body: formData
      })
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.imageUrl);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileInputChange} required />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
    </div>
  );
}

export default Test;