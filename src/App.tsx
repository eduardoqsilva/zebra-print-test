import { toPng } from 'html-to-image'
import { useRef, useState } from 'react'
import { LabelPrint } from './components/label-print'
import { Printer } from './components/printer'
import { usePrinter } from './hooks/userPrinter'

function App() {
  const labelPrint = useRef<HTMLDivElement | null>(null)
  const { printImage } = usePrinter()
  const [loading, setLoading] = useState<boolean>(false)

  const downloadImage = async (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref?.current) {
      console.error('A referência está vazia.')
      return
    }

    try {
      const dataUrl = await toPng(ref.current, { cacheBust: true })
      return dataUrl
    } catch (err) {
      console.error('Oops, algo deu errado!', err)
    }
  }

  async function handleExportToPrint() {
    setLoading(true)

    const img = await downloadImage(labelPrint)

    if (img) {
      printImage(img, 2)
      console.log(img)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center justify-center p-6">
      <h1 className="text-2xl font-medium">Imagem impressora zebra</h1>
      <Printer />
      <hr />
      <h1 className="text-2xl font-medium">Teste etiquetas html e css impressora zebra</h1>
      <div className="border-1 border-neutral-500 rounded-xl shadow-xl p-2">
        <LabelPrint ref={labelPrint} />
      </div>
      <button
        disabled={loading}
        type="button"
        onClick={handleExportToPrint}
        style={{ marginTop: '10px' }}
        className="px-3 py-2 bg-blue-500 rounded-md text-white font-medium disabled:opacity-40"
      >
        Imprimir Etiqueta de teste 2 vezes
      </button>
    </div>
  )
}

export default App
