import { useRef, useState } from "react";

export default function FullScreen() {
    const [images, setImages] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const galleria1 = useRef(null);
    const galleria2 = useRef(null);
    const galleria3 = useRef(null);
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    const responsiveOptions2 = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

  return (
    <div>FullScreen</div>
  )
}
