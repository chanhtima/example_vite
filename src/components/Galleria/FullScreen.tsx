import { useEffect, useRef, useState } from "react"
import { getPhotos } from "../../services/api/photos.api.mockup";
import { dataProps } from "../../models/FileUpload.model";
import { Galleria } from 'primereact/galleria';

export default function FullScreen() {
    const [data, setData] = useState<dataProps[]>([]);
    const galleria3 = useRef<Galleria>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchImages = async () => {
        try {
            const fetchedData = await getPhotos();
            if (Array.isArray(fetchedData)) {
                setData(fetchedData);
            } else {
                console.error('Fetched data is not an array:', fetchedData);
                setData([]);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setData([]);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

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
                        style={{ width: '100%', display: 'block', maxHeight:'500px' }}
                    />
                </div>
        
          
                    <div className="bg-white px-4  line-clamp-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias adipisci tenetur, rem voluptatem aspernatur dolor, quisquam exercitationem fugiat optio, numquam error! Voluptatem fuga ratione laborum deleniti molestias qui. Itaque, sit?
                    Nostrum hic ratione dicta beatae sed quod dolorum temporibus fuga odio perferendis nulla omnis animi ducimus nihil, pariatur voluptate nisi unde? Commodi aperiam veritatis molestias consequuntur labore eius neque. Sed!
                    Pariatur magnam, eaque nam nostrum ipsa id quia aperiam, numquam natus libero, laboriosam exercitationem magni deserunt nemo. Fugit odit dicta, veritatis, modi inventore molestiae natus optio necessitatibus, cumque cupiditate aperiam?
                    Consequuntur illo aut ex debitis dolor nisi eius facilis excepturi expedita, sunt aperiam placeat vel quas non blanditiis alias nam! Libero natus sit enim repellat, voluptatibus exercitationem unde autem quos?
                    Cum delectus neque quam tempora illum? A repellat rerum dicta porro harum eos placeat id laudantium ad, cumque quibusdam totam unde maiores consequatur cupiditate mollitia, dolorem laborum vel. Aliquam, magnam?
                    Atque nulla porro neque optio hic illum mollitia ut. Est, officia. Neque cum, corrupti natus quisquam magnam praesentium, itaque laboriosam quaerat expedita ex consectetur mollitia veniam exercitationem corporis? Voluptatum, consectetur.
                    Error quo laudantium, repellat omnis quaerat, placeat sed officiis est sint exercitationem labore cupiditate vel deserunt mollitia, ipsam alias quos reiciendis corrupti quae. Quaerat enim tempora quidem nemo illum cum.
                    Unde ullam exercitationem odit labore ea illo dolore magnam, molestiae quidem esse rem sit consequatur sequi eveniet fugiat. Eligendi autem vero quam quis velit rerum laborum suscipit perferendis modi ratione.
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
                ref={galleria3}
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
                {data && data.map((image, index) => {
                    let imgEl = (
                        <img
                            src={image.thumbnailImageSrc}
                            onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                            alt={image.alt}
                            style={{ cursor: 'pointer' }}
                            className="object-cover w-full  h-[400px] md:h-[200px] rounded-md"
                            onClick={() => {
                                setActiveIndex(index);
                                galleria3.current?.show();
                            }}
                        />
                    );
                    return (
                        <div className=" col-12 md:col-6 lg:col-4" key={index}>
                            {imgEl}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
