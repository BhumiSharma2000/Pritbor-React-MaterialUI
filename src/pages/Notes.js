import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core/'
import NoteCard from '../components/NotesCard'
import Masonry from 'react-masonry-css'
export default function Notes() {

  const [notes, setNotes] = useState([])
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/BhumiSharma2000/ReactII/notes")
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('https://my-json-server.typicode.com/BhumiSharma2000/ReactII/notes' + id, {
      method: 'DELETE'
    })

    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  const breakpoint = {
    default: 3,
    1100: 2,
    700: 1
  }
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoint}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {notes.map(note => (
          <div item key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
