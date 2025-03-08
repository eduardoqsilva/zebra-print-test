import { useState, useEffect } from "react";

type PrinterDevice = {
  name: string;
  connection: string;
  deviceType: string;
  send: (data: string, onSuccess?: () => void, onError?: (err: string) => void) => void;
  read: (onSuccess: (data: string) => void, onError?: (err: string) => void) => void;
  sendFile?: (file: string, onSuccess?: () => void, onError?: (err: string) => void) => void;
};

export function usePrinter() {
  const [printer, setPrinter] = useState<PrinterDevice | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.BrowserPrint) {
      setError("BrowserPrint não foi encontrado.");
      return;
    }

    window.BrowserPrint.getDefaultDevice(
      "printer",
      (device: PrinterDevice) => setPrinter(device),
      (err: string) => setError(`Erro ao obter impressora: ${err}`)
    );
  }, []);

  const sendImageToPrinter = (imageUrl: string, quantity: number) => {
    if (!printer) {
      setError("Nenhuma impressora conectada.");
      return;
    }
  
    printer.sendFile?.(
      imageUrl,
      () => {
        console.log(`Imagem enviada com sucesso! (${quantity} cópias)`);
        printer.send(`^XA\n^PQ${quantity}\n^XZ`); // Define a quantidade de cópias
      },
      (err: string) => setError(`Erro ao imprimir imagem: ${err}`)
    );
  };
  

  return { printer, sendImageToPrinter, error };
}
