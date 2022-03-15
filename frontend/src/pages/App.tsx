import React from 'react'
import { FileUpload } from '../components/FileUploader'
import { Grid } from '@material-ui/core'

export const App = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1>Upload de arquivos</h1>
      <FileUpload/>
    </Grid>
  )
}
