export interface Product {
    id: string;
    code: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    image: string;
    gallery: string[];
    reviews: {
        review_images: string[];
    };
}

