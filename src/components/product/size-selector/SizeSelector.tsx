import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSize: Size[];

    onSizeChanged: (size: Size) => void;
}


export const SizeSelector = ({selectedSize,availableSize, onSizeChanged}: Props) => {
  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Talles Disponibles</h3>

        <div className="flex">

            {
                availableSize.map( size => (

                    <button
                        key={size}
                        onClick={() => onSizeChanged(size) }
                        className={
                            clsx(
                                "mx-2 font-semibold hover:underline text-lg cursor-pointer",
                                {
                                    'underline': size === selectedSize
                                }
                            )
                        }
                    >
                        {size}
                    </button>
                ))
            }

        </div>
    </div>
  )
}
