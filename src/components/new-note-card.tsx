import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
    const [shouldShowOnboarding, setShouldShowOnboarding]= useState(true)
    const [content, setContent] = useState('')
    const [isRecording, setIsRecording] = useState(false)

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

      if (content === '') {
        return
      }

      onNoteCreated(content)

      setContent('')
      setShouldShowOnboarding(true)

      toast.success('Nota criada com sucesso ʕ•́ᴥ•̀ʔっ')
    }

    {/* HANDLE START RECORDING */}
    function handleStartRecording() {

      const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
        || 'webkitSpeechRecognition' in window
      
      if (!isSpeechRecognitionAPIAvailable) {
        alert('Infelizmente set navegador não suporta essa funcionalidade.')
        return
      }

      setIsRecording(true)
      setShouldShowOnboarding(false)

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

      speechRecognition = new SpeechRecognitionAPI()

      speechRecognition.lang = 'en-US'
      speechRecognition.continuous = true
      speechRecognition.maxAlternatives = 1
      speechRecognition.interimResults = true

      speechRecognition.onresult = (event) => {
        const transcription = Array.from(event.results).reduce((text, result) => {
          return text.concat(result[0].transcript)
        }, '')

        setContent(transcription)
      }

      speechRecognition.onerror = (event) => {
        console.error(event)
      }

      speechRecognition.start()

    }

    function handleStopRecording() {
      setIsRecording(false)

      if (speechRecognition !== null) {
        speechRecognition.stop()
      }
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
          <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>

            {/* START CLOSE BUTTON */}
              <Dialog.Close 
              onClick={handleStopRecording}
              className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
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
                  Comece <button type='button' onClick={handleStartRecording} className='text-medium text-lime-400 hover:underline'> gravando uma nota em áudio,</button> ou se preferir <button type='button' className='text-medium text-lime-400 hover:underline' onClick={handleStartEditor}>utilize apenas texto.</button>
                  </p>
                ) : (
                  <textarea 
                  autoFocus 
                  className='text-sm leading-6 bg-transparent text-slate-400 resize-none flex-1 outline-none'
                  onChange={handleContentChanged}
                  value={content}
                  />
                ) }

              </div>
              
              {/* RECORDING BUTTON */}
              {isRecording ? (
                <button
                onClick={handleStopRecording}
                type='button'
                className='w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:bg-slate-100 flex items-center justify-center gap-2'
                >
                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                Gravando ٩(˘◡˘)۶ (clique para interromper)
                </button>
              ) : (
                <button
                type='button'
                onClick={handleSaveNote}
                className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
                >
                Salvar nota ٩(˘◡˘)۶
                </button>
              )}

              
            </form>

          </Dialog.Content> {/* Main modal div? */}
        </Dialog.Portal>

      </Dialog.Root>
    )
}