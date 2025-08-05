import { useRef, useState } from 'react'
import { useEffect } from 'react';

function App() {

  const [notificationStatus, isnotificationEnabled] = useState(true)

  // open notification

  const openeNotification = () => {

    notificationIcon(notification)

    isnotificationEnabled(true)

    console.log("notifications are open");

  }


  // close notifications 

  const closeNotification = () => {

    notificationIcon(

      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5} stroke="currentColor"
        className="size-8 text-white" onClick={openeNotification}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
      </svg>
    )

    isnotificationEnabled(false)

    console.log("notifications are closed");

  }


  // notification icons

  const [notification, notificationIcon] = useState(

    <svg xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor"
      className="size-8 text-white" onClick={closeNotification}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>

  )



  // notes

  const [notes, setNotes] = useState([
    {
      id: 0,
      title: "what's going on today?",
      info: new Date().toLocaleDateString(),
      isEditing: false,
    },
  ])

  const notesRef = useRef(notes);

  useEffect(() => {

    notesRef.current = notes;
  }, [notes]);


  // add new note function

  const add = () => {

    const newNote = {

      id: notesRef.current.length,
      title: '',
      info: new Date().toLocaleDateString(),
      isEditing: true,
    };

    setNotes(prevNotes => [...prevNotes, newNote]);



    // getting id of the new note

    const newNoteId = newNote.id;


    // now we program the reminder

    const reminder = setInterval(() => {

      const updatedNote = notesRef.current.find(note => note.id === newNoteId);

      if (updatedNote) {

        if (Notification.permission === "granted") {
          let message = new Notification("don't forget", { body: updatedNote.title });
        }
      }

    }, 10000);

  };


  // remove all function after 24 hours

  const removeAll = () => {

    setNotes(prevNotes => prevNotes.filter(note => note.id === 0));

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

  // week day 

  let date = new Date();
  let [weekday, day] = useState(date.getDay())

  switch (weekday) {

    case 0: day("Sunday")

      break;

    case 1: day("Monday")

      break;

    case 2: day("Tuesday")

      break;

    case 3: day("Wednesday")

      break;

    case 4: day("Thursday")

      break;

    case 5: day("Friday")

      break;

    case 6: day("Saturday")

      break;

    default: "not found"
      break;
  }


  return (

    <div className='w-screen h-screen bg-black px-8 py-8'>

      {/* header part */}

      <div className='w-full h-1/4 rounded-xl bg-white/15'>


        {/* icons , top part */}

        <div className="w-full h-1/3 flex px-5">


          {/* profile icon */}

          <div className="w-1/2 h-full flex items-center justify-start">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

          </div>


          {/* notification icon */}

          <div className="w-1/2 h-full  flex items-center justify-end">

            {notification}

          </div>

        </div>


        {/* date and weekday  , bottom part */}

        <div className="w-full h-2/3 px-2">

          <h1 className='text-3xl text-white pl-4 pt-6'> {weekday} </h1>
          <p className='text-sm text-white pl-6 pt-2'> {notes[0]?.info} </p>

        </div>

      </div>


      {/* note part */}

      <div className="w-full h-4/6 rounded-xl mt-6 px-8 py-1 overflow-auto bg-white/15">

        {notes.map(note => (

          <div key={note.id} className='relative w-full h-20 rounded-lg mt-6 flex'>


            {/* text box */}

            <div className='h-full w-4/5 shadow-md shadow-black/50 rounded-md flex flex-col justify-center'>

              {note.isEditing ? (


                // note

                <>
                  <input
                    type="text"
                    value={note.title}
                    onChange={e => updateTitle(note.id, e.target.value)}
                    placeholder="new note..."
                    className='text-md text-white pl-3 pt-2 bg-white/0 outline-none placeholder:text-white placeholder:text-md'
                  />

                </>


              ) : (

                // add note

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
