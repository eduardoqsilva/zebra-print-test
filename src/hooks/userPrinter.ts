import { useEffect, useState } from 'react'

// type PrintOptions = {
//   toFormat?: string
//   fromFormat?: string
//   featureKey?: string
// }

type PrinterDevice = {
  name: string
  connection: string
  deviceType: string
}

export function usePrinter() {
  const [printer, setPrinter] = useState<PrinterDevice | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!window.BrowserPrint) {
      setError('BrowserPrint não foi encontrado.')
      return
    }

    window.BrowserPrint.getDefaultDevice(
      'printer',
      (device: PrinterDevice) => setPrinter(device),
      (err: string) => setError(`Erro ao obter impressora: ${err}`)
    )
  }, [])

  const printImage = async (imageUrl: string, quantity: number) => {
    if (!printer) {
      setError('Nenhuma impressora conectada.')
      return
    }

    try {
      const zebraPrinter = new window.BrowserPrint.Printer(printer) // Instanciando a classe Printer

      for (let i = 0; i < quantity; i++) {
        await zebraPrinter.printImageAsLabel?.(
          imageUrl,
          { toFormat: 'zpl' },
          () => console.log(`Imagem impressa com sucesso! Cópia ${i + 1} de ${quantity}`),
          (err: unknown) => setError(`Erro ao imprimir: ${err}`)
        )
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Erro ao imprimir imagem: ${err.message}`)
      } else {
        setError('Erro desconhecido ao imprimir a imagem.')
      }
    }
  }

  return { printer, printImage, error }
}
