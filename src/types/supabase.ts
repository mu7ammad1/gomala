export interface Discount {
    amount_off?: number;
    percentage?: number;
    is_active: boolean;
    starts_at: string;
    ends_at: string;
}

export interface ProductDiscounts {
    discounts: Discount[];
}

export interface TumblerImages {
    main_image: string;
    tumbler_images: string[];
}

export interface ReviewImage {
    url: string;
}

export interface ProductReviews {
    average_rating: number;
    review_images: string[];
}

export interface Product {
    id: string; // Using string as UUIDs are strings
    title: string;
    description: string | null;
    price: number;
    discount: ProductDiscounts | null; // JSONB
    tumblers: TumblerImages | null; // JSONB
    reviews: ProductReviews | null; // JSONB
    created_at: string;
    product_number: number;
}
