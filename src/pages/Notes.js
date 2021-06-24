import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core/'
import NoteCard from '../components/NotesCard'
export default function Notes() {

  const [notes, setNotes] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:3000/notes/' + id, {
      method: 'DELETE'
    })

    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item key={note.id} xs={12} lg={4} md={6}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
