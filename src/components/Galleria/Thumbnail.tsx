import { Galleria } from "primereact/galleria";
import { dataProps, FullScreenProps } from "../../models/galleria.model";

export default function Thumbnail({ data }: FullScreenProps) {
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
        return <img src={item.itemImageSrc}
            onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
            alt={item.alt}
            style={{ width: '100%', display: 'block', height: "500px", objectFit:'initial'}} />
            
    }

    const thumbnailTemplate = (item: dataProps) => {
        return <img src={item.thumbnailImageSrc}
            onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
            alt={item.alt}
            style={{ width: '100px', display: 'block', height: "100px", objectFit: 'initial' }} />
    }

    return (

        <Galleria value={data}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            style={{ maxWidth: '640px' }}
            item={itemTemplate}
            // thumbnailsPosition="right"
            thumbnail={thumbnailTemplate} />

    );
}
