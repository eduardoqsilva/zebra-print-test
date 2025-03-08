import type React from 'react'
import { usePrinter } from '../@types/userPrinter'

export const Printer: React.FC = () => {
  const { printer, sendDataToPrinter, error } = usePrinter()

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl'>Impressora Zebra</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {printer ? (
        <>
          <p className='text-base'>
            <strong>Impressora:</strong> {printer.name}
          </p>
          <button
            className='px-4 py-1 rounded-sm bg-blue-600 text-white'
            type="button"
            onClick={() =>
              sendDataToPrinter(
                '^XA^FO50,50^A0N50,50^FDTeste de Impressão!^FS^XZ'
              )
            }
          >
            Imprimir Configuração
          </button>
        </>
      ) : (
        <p className='text-sky-400 font-bold'>Buscando impressoras...</p>
      )}
    </div>
  )
}
