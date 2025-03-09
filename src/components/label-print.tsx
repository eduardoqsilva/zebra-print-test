import barCode from '../assets/bar-code.jpg'
import logo from '../assets/logo.jpg'
import qrCode from '../assets/qr-code.jpg'

export function LabelPrint({
  ref,
}: { ref: React.Ref<HTMLDivElement> | undefined }) {
  return (
    <div
      ref={ref}
      className="w-[332px] aspect-[5/4] p-2 font-sans flex flex-col gap-1"
    >
      <div className="border-b border-neutral-400 pb-1 h-[49px]">
        <h1 className="uppercase font-medium text-base">
          Loja de móveis dalton spider ltda
        </h1>
        <h1 className="uppercase text-sm font-medium">Rio de janeiro, Rj</h1>
      </div>
      <div className="border-b border-neutral-400 pb-1 h-[73px]">
        <h1 className="uppercase font-medium text-xl">Mesa gaya 2,00 x 1,00</h1>
        <h1 className="uppercase text-sm font-medium">
          BA: Natural / BA: branco / T: Off-white / Vd: Branco / F: Monaco
        </h1>
      </div>
      <div className="border-b border-neutral-400 pb-1 grid grid-cols-[auto_30%] gap-3 h-[45px]">
        <p className="font-normal text-sm">
          <strong>Obs:</strong> ipsum, dolor sit amet consectetur adipisicing
          elit.
        </p>
        <div className="aspect-[10/3] w-full">
          <img src={barCode} alt="" />
        </div>
      </div>
      <div className="border-b border-neutral-400 pb-1 flex gap-2 text-base font-bold h-[29px]">
        <h2>Entrega:______</h2>
        <h2>Volume:______</h2>
      </div>
      <div className="grid grid-cols-[auto_40px] gap-3 h-[45px]">
        <div className="aspect-[10/3] w-[150px]">
          <img src={logo} alt="" />
        </div>
        <div className="aspect-square w-full">
          <img className="object-contain" src={qrCode} alt="" />
        </div>
      </div>
    </div>
  )
}
