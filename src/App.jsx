import { useState } from 'react'
import Header from './components/header/Header'
import Notes from './components/notes/Notes'

function App() {

  const [notes, setNotes] = useState([

    {
      id: 0,
      title: "what's going on today?",
      info: new Date().toLocaleDateString(),
      isEditing: false,
    },

  ])

  return (

    <div className='w-screen h-screen bg-black px-8 py-8'>

      <Header note={notes[0]?.info} />
      <Notes notes={notes} setNotes={setNotes} />

    </div>
  )
}

export default App
