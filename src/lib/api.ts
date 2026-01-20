import { supabase } from "./supabase";
import { Product } from "@/types/supabase";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return (data as any[]).map(item => ({
        ...(item.product || {}),
        id: item.product?.id || item.id
    })) as Product[];
}

const constans: Product[] = [
    {
        id: "elmafioso-4-qadaya",
        code: 456,
        name: "elmafioso 4 qadaya",
        description: "product one description",
        price: 450,
        discount: 89,
        image: "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760949_1280.png",
        gallery: [
            "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760950_1280.png",
            "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760953_1280.png",
            "https://cdn.pixabay.com/photo/2024/05/14/11/38/tv-8760957_1280.png",
            "https://cdn.pixabay.com/photo/2024/05/14/11/38/tv-8760954_1280.png",
            "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760949_1280.png"
        ],
        reviews: {
            review_images: [
                "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760950_1280.png",
                "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760953_1280.png",
                "https://cdn.pixabay.com/photo/2024/05/14/11/38/tv-8760957_1280.png",
                "https://cdn.pixabay.com/photo/2024/05/14/11/38/tv-8760954_1280.png",
                "https://cdn.pixabay.com/photo/2024/05/14/11/37/tv-8760949_1280.png"
            ]
        },
    }
];

export async function getProductById(id: string): Promise<Product | null> {
    try {
        // Try searching both table ID column and ID inside the product JSON column
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`id.eq."${id}",product->>id.eq."${id}"`)
            .maybeSingle();

        if (error) {
            console.warn(`Supabase fetch error for ${id}:`, error.message);
        } else if (data) {
            return {
                ...(data.product || {}),
                id: data.product?.id || data.id
            } as Product;
        }
    } catch (e) {
        console.error("Unexpected error fetching product:", e);
    }

    // Fallback to constants if not found in DB
    const fallback = constans.find(p => p.id === id);
    return fallback || null;
}
