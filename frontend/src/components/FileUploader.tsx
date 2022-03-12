import React from 'react'
import axios from 'axios'

export const FileUpload = () => {
  const [selectedFile, setSelectedFile] = React.useState(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("selectedFile", selectedFile ?? '')
    try {
       await axios({
        method: "post",
        url: "http://localhost:3333/fileupload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
  )
}

