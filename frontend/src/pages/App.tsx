import React from 'react'
import { FileUpload } from '../components/FileUploader'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  upload: {
    height: '100vh',
    backgroundColor: '#3a3b3c'
  },
  border: {
    border: '1px solid black',
    borderRadius: '25px',
    padding: '25px',
    backgroundColor: '#f5f5f5'
  },
  title: {
    textAlign: 'center'
  }
}))

export const App = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.upload}
    >
      <div className={classes.border}>
        <h1 className={classes.title}>
          Upload de arquivos
        </h1>
        <FileUpload/>
      </div>
    </Grid>
  )
}
