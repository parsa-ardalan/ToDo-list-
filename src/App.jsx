import { useState } from 'react'

function App() {


  // notes

  const [notes, setNotes] = useState([
    {
      id: 0,
      title: "what's going on today?",
      info: new Date().toLocaleDateString(),
      isEditing: false,
    },
  ])


  // add new note function

  const add = () => {
    setNotes(prevNotes => [
      ...prevNotes,
      {
        id: prevNotes.length,
        title: '',
        info: new Date().toLocaleDateString(),
        isEditing: true,
      },
    ])
  }


  // remove note function

  const remove = (id) => {

    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }



  const updateTitle = (id, value) => {

    setNotes(prevNotes => prevNotes.map(

      note => note.id === id ? { ...note, title: value } : note
    )
    )
  }


  return (

    <div className='w-screen h-screen'>

      {/* white part */}

      <div className='h-1/6 bg-white'>
        <h1 className='text-fuchsia-600 text-4xl pl-10 pt-10'> To-do list </h1>
      </div>


      {/* purple part */}

      <div className="container-box h-5/6 w-full rounded-tl-3xl px-8 py-1 overflow-auto bg-fuchsia-600">

        {notes.map(note => (

          <div key={note.id} className='relative w-full h-20 rounded-lg mt-6 flex'>


            {/* text box */}

            <div className='h-full w-4/5 shadow-md shadow-black/50 rounded-md flex flex-col justify-center'>

              {note.isEditing ? (

                <input
                  type="text"
                  value={note.title}
                  onChange={e => updateTitle(note.id, e.target.value)}
                  placeholder="new note..."
                  className='text-md text-white pl-3 pt-2 bg-fuchsia-600 outline-none placeholder:text-white placeholder:text-md'
                />
              ) : (
                <>
                  <h1 className='text-md text-white pl-3 pt-2'>{note.title}</h1>
                  <h2 className='text-xs text-white pl-4 pt-2'>{note.info}</h2>
                </>
              )}

            </div>


            {/* add / delete button */}

            {note.id === 0 ? (


              // add button

              <button
                className='flex items-center justify-center absolute bottom-0 -right-3 h-2/3 w-1/5 shadow-md shadow-black/50 rounded-md'
                onClick={add}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>

            ) : (

              // delete button

              <button
                className='flex items-center justify-center absolute bottom-0 -right-3 h-2/3 w-1/5 shadow-md shadow-black/50 rounded-md'
                onClick={() => remove(note.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

              </button>
            )}

          </div>

        ))}

      </div>

    </div>
  )
}

export default App
