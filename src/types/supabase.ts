export interface Product {
    id: string;
    created_at: Date;
    json: {
        id: string;
        code: number;
        name: string;
        image: string;
        price: number;
        discount: number;
        gallery: string[];
        reviews: string[];
        description: string
    }
}

