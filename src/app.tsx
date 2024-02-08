import logo from './assets/Logo.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

const note = {
  date: new Date(),
  content: 'Hello world'
}

export function App() {
  return (
    <div className="mx-auto ml-12 max-w-6xl my-12 space-y-6">
      <img src={logo} alt="nlw expert" />

      {/* INPUT */}
      <form action="" className="w-full mt-6">
        <input 
          type="text"  
          placeholder='Busque em suas notas... ✍(◔◡◔)'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          />
      </form>
      {/* END INPUT */}

      {/* DIVISOR */}
      <div className='h-px bg-slate-700' />
      {/* END DIVISOR */}

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6 auto-rows-[250px] text-sm">

        {/* START NewNoteCard */}
        <NewNoteCard/>
        {/* END NewNoteCard */}

        {/* START NoteCard */}
        <NoteCard  note={note}/>
        {/* END NoteCard */}

      </div>
      {/* END GRID */}

    </div>
  )
}


