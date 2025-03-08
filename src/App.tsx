import { Printer } from "./components/printer"

function App() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-medium">Teste etiquetas impressora zebra</h1>
      <Printer />
    </div>
  )
}

export default App
