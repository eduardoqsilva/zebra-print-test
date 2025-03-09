import { useEffect, useState } from 'react'

type PrintOptions = {
  toFormat?: string // Opcional: formato para conversão da imagem
  fromFormat?: string // Opcional: formato de origem da imagem
  featureKey?: string // Opcional: chave de licenciamento
}

type PrinterDevice = {
  name: string
  connection: string
  deviceType: string
  printImageAsLabel?: (
    resource: string | Blob,
    options?: PrintOptions, // Usando o tipo PrintOptions para as opções de impressão
    success?: () => void, // Função de sucesso
    failure?: (err: string) => void // Função de erro
  ) => Promise<void> // Assume-se que a função retorna uma Promise, já que é assíncrona
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

  const printImage = (imageUrl: string, quantity: number) => {
    if (!printer || !printer.printImageAsLabel) {
      setError('Função printImageAsLabel não disponível.')
      return
    }
  
    // Função para impressão múltiplas vezes, utilizando Promise
    const printMultipleCopies = async (): Promise<void> => {
      try {
        for (let i = 0; i < quantity; i++) {
          // Usando o operador de encadeamento opcional (?.) para garantir que printImageAsLabel está definido
          await printer.printImageAsLabel?.(
            imageUrl, // URL da imagem
            { toFormat: 'zpl' } // Converte para ZPL automaticamente
          )
          console.log(
            `Imagem enviada com sucesso! Cópia ${i + 1} de ${quantity}`
          )
        }
      } catch (err: unknown) {
        // Erro com tipo desconhecido
        if (err instanceof Error) {
          setError(`Erro ao imprimir imagem: ${err.message}`)
        } else {
          setError('Erro desconhecido ao imprimir a imagem.')
        }
      }
    }
  
    // Chama a função de imprimir múltiplas cópias
    printMultipleCopies()
  }
  
  return { printer, printImage, error }
}
