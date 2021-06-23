import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { FormControlLabel, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
  field:
  {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [category, setCategory] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailError, setDetailError] = useState(false)
  const history = useHistory('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setDetailError(false)
    setTitleError(false)
    if (title == '') {
      setTitleError(true)
    }
    if (detail == '') {
      setDetailError(true)
    }
    if (title && detail) {
      fetch("http://localhost:3000/notes",{
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({title,detail,category})
      }).then(()=>history.push('/'))
    }
  }
  return (
    <Container>
      <Typography
        className={classes.title}
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom>
        Create a New Note
      </Typography>


      <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="primary"
          fullWidth
          required
          error={titleError} />

        <TextField
          onChange={(e) => setDetail(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="primary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailError} />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminder" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          type="submit" color="primary" variant="contained"
          startIcon={<SendIcon />} endIcon={<KeyboardArrowRightIcon />}>&nbsp; Submit</Button>

      </form>



    </Container>
  )

}
