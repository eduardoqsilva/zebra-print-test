import type React from 'react'
import { usePrinter } from '../@types/userPrinter'

export const Printer: React.FC = () => {
  const { sendImageToPrinter, error } = usePrinter()

  const imageUrl = 'https://picsum.photos/300/150' // URL da imagem de teste

  return (
    <div>
      <h2>Impressora Zebra</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Imagem de teste:</p>
      <img
        src={imageUrl}
        alt="Imagem de Teste"
        style={{ width: '200px', border: '1px solid black' }}
      />
      <br />
      <button
        type='button'
        onClick={() => sendImageToPrinter(imageUrl)}
        style={{ marginTop: '10px' }}
        className='px-3 py-2 bg-blue-500 rounded-md'
      >
        Imprimir Imagem de Teste
      </button>
    </div>
  )
}
