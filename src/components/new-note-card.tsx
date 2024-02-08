import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'


export function NewNoteCard() {
    const [shouldShowOnboarding, setShouldShowOnboarding]= useState(true)
    const [content, setContent] = useState('')

    function handleStartEditor() {
      setShouldShowOnboarding(false)
    } {/* FUNCTION TO START A TEXT NOTE */}

    {/* IF CONTENT IS ERASED, GOES BACK TO REGULAR MODAL */}
    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
      setContent(event.target.value)

      if (event.target.value === '') {
        setShouldShowOnboarding(true)
      }
    }

    {/* SAVING THE NOTE */}
    function handleSaveNote(event: FormEvent) {
      event.preventDefault()

      toast.success('Nota criada com sucesso ʕ•́ᴥ•̀ʔっ')
    }

    {/* NEW CARD */}
    return (
      <Dialog.Root>
        <Dialog.Trigger className="flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
          <span className='font-medium text-slate-200'>
            Adicionar nota (っ◔◡◔)っ ❤
          </span>
          <p className='leading-6 text-slate-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </Dialog.Trigger>

         {/* NOTES MODAL */}
         <Dialog.Portal>
          <Dialog.Overlay className='inset-0 fixed bg-black/60'/> {/* Background Overlay */}
          <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>

            {/* START CLOSE BUTTON */}
              <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                <X className='size-5'/>
              </Dialog.Close>
            {/* END CLOSE BUTTON */}


            <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>
              <div className="flex flex-1 flex-col gap-3 p-5">

                <span className='font-medium text-slate-300'>
                  Adicionar nota
                </span>
                {/* MODAL FUNCTION TO START A NOTE */}
                {shouldShowOnboarding ? (
                  <p className="leading-6 text-slate-400">
                  Comece <button className='text-medium text-lime-400 hover:underline'> gravando uma nota em áudio,</button> ou se preferir <button className='text-medium text-lime-400 hover:underline' onClick={handleStartEditor}>utilize apenas texto.</button>
                  </p>
                ) : (
                  <textarea 
                  autoFocus 
                  className='text-sm leading-6 bg-transparent text-slate-400 resize-none flex-1 outline-none'
                  onChange={handleContentChanged}
                  />
                ) }

              </div>

              <button
                type='submit'
                className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
              >
              Salvar nota ٩(˘◡˘)۶
              </button>
            </form>

          </Dialog.Content> {/* Main modal div? */}
        </Dialog.Portal>

      </Dialog.Root>
    )
}