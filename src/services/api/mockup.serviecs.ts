export interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: 'INSTOCK' | 'OUTOFSTOCK';
    rating: number;
}

const TOTAL_ITEMS = 45;
const ITEMS_PER_PAGE = 20;

export type Paginate<T = any> = {
    entities: T[];
    page_information: PageInformation;
};

export type PageInformation = {
    count: number;
    last_page: number;
};

export const generateMockData = (): Paginate<Product> => {
    const products: Product[] = [];

    for (let i = 0; i < TOTAL_ITEMS; i++) {
        products.push({
            id: (i + 1).toString(),
            code: `รหัส${i + 1}`,
            name: `ชื่อ ${i + 1}`,
            description: 'Product Description',
            image: `product${i + 1}.jpg`,
            price: Math.floor(Math.random() * 20) + 1,
            category: 'Accessories',
            quantity: Math.floor(Math.random() * 50) + 1,
            inventoryStatus: i % 2 === 0 ? 'INSTOCK' : 'OUTOFSTOCK',
            rating: Math.floor(Math.random() * 5) + 1
        });
    }

    const pageInformation: PageInformation = {
        count: TOTAL_ITEMS,
        last_page: Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE),
    };

    return {
        entities: products,
        page_information: pageInformation
    };
};
