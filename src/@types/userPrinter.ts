import { useEffect, useState } from 'react'

type PrinterDevice = {
  name: string
  connection: string
  deviceType: string
  send: (
    data: string,
    onSuccess?: () => void,
    onError?: (err: string) => void
  ) => void
  read: (
    onSuccess: (data: string) => void,
    onError?: (err: string) => void
  ) => void
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

  const sendDataToPrinter = (data: string) => {
    if (!printer) {
      setError('Nenhuma impressora conectada.')
      return
    }

    printer.send(
      data,
      () => console.log('Dados enviados com sucesso!'),
      (err: string) => setError(`Erro ao enviar dados: ${err}`)
    )
  }

  return { printer, sendDataToPrinter, error }
}
