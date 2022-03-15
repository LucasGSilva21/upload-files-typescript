import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Input, Button } from '@material-ui/core'
import { CloudUpload, Clear } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export const FileUpload = () => {
  const classes = useStyles()

  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [isSelected , setIsSelected] = useState(false)

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
    setIsSelected(true)
  }

  const cleanFileSelect = () => {
    setIsSelected(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Input type="file" onChange={handleFileSelect}/>
        {isSelected ? (
          <div>
            <p>Nome do arquivo: {selectedFile?.name}</p>
            <p>Tipo do arquivo: {selectedFile?.type ?? 'Não identificado'}</p>
            <p>Tamanho em bytes: {selectedFile?.size}</p>
            <p>
              Última modificação:{' '}
              {selectedFile?.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Selecione um arquivo para ver os detalhes</p>
        )}
        <br/>
        <Button
          type="reset"
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<Clear />}
          onClick={cleanFileSelect}
        >
          Limpar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CloudUpload />}
        >
          Enviar
        </Button>
      </Grid>
    </form>
  )
}
