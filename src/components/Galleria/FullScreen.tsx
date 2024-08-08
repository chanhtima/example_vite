import {  useRef, useState } from "react"
import { Galleria } from 'primereact/galleria';
import { dataProps, FullScreenProps } from "../../models/galleria.model";

export default function FullScreen({data}:FullScreenProps) {
   
    const galleria = useRef<Galleria>(null);
    const [activeIndex, setActiveIndex] = useState(0);
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
    const itemTemplate = (item: dataProps) => {
        return (
            <div className=" max-w-[500px] ">
                <div >
                    <img
                        src={item.thumbnailImageSrc}
                        onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                        alt={item.alt}
                        style={{ width: '100%', display: 'block', maxHeight: '550px' }}
                    />
                </div>


                <div className="bg-white px-4 py-2 ">
                    <p className="line-clamp-5">
                        {item.details}
                    </p>
                </div>

            </div>

        );
    };

    const thumbnailTemplate = (item: dataProps) => {
        return (
            <img
                src={item.thumbnailImageSrc}
                onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                alt={item.alt}
                style={{ width: '100%', display: 'block' }}
            />
        );
    };

    return (
        <div>
            <Galleria
                ref={galleria}
                value={data}
                responsiveOptions={responsiveOptions}
                numVisible={7}
                activeIndex={activeIndex}
                onItemChange={(e) => setActiveIndex(e.index)}
                circular
                fullScreen
                showItemNavigators
                showThumbnails={false}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
            />

            <div className="grid mb-10">
                {data && data.map((image: dataProps, index:number) => {
                    let imgEl = (
                        <img
                            src={image.thumbnailImageSrc}
                            onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                            alt={image.alt}
                            style={{ cursor: 'pointer' }}
                            className="object-cover w-full  h-[300px] sm:h-[400px] md:h-[200px] rounded-md"
                            onClick={() => {
                                setActiveIndex(index);
                                galleria.current?.show();
                            }}
                        />
                    );
                    return (
                        <div className=" col-12 md:col-6 lg:col-4 " key={index}>
                            {imgEl}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
