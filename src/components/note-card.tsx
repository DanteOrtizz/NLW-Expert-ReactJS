import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

{/* CARD CONTENT */}
interface NoteCardProps {
  note: {
    date: Date
    content: string
  }
}

{/* CARD */}
export function NoteCard({ note }: NoteCardProps) {
    return (
      <Dialog.Root>
        <Dialog.Trigger className="text-left outline-none rounded-md bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 flex flex-col">
          <span className='font-medium text-slate-300'>
            {note.date.toISOString()}
          </span>
          <p className="leading-6 text-slate-400">
            {note.content}
          </p>

          {/* GRADIENT */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
          {/* END GRADIENT */}
        </Dialog.Trigger>

        {/* EDIT MODAL */}
        <Dialog.Portal>
          <Dialog.Overlay className='inset-0 fixed bg-black/60'/> {/* Background Overlay */}
          <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>

            {/* START CLOSE BUTTON */}
              <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                <X className='size-5'/>
              </Dialog.Close>
            {/* END CLOSE BUTTON */}

            <div className="flex flex-1 flex-col gap-3 p-5">

              <span className='font-medium text-slate-300'>
              {formatDistanceToNow(note.date, { locale:ptBR,  addSuffix:true})}
              </span>

              <p className="leading-6 text-slate-400">
              {note.content}
              </p>

            </div>

            <button
              type='button'
              className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
            >
              Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota?</span>
            </button>

          </Dialog.Content> {/* Main modal div? */}
        </Dialog.Portal>
      </Dialog.Root>
    )
}