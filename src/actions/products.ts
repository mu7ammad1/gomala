"use server";

import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";

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

export async function getProducts(): Promise<Product[]> {
    try {
        console.log('--- Fetching Products ---');

        // المحاولة الأولى: جدول product
        let { data, error } = await supabase.from('product').select('*');

        // المحاولة الثانية: جدول products (إذا فشل الأول أو كان فارغاً)
        if (error || !data || data.length === 0) {
            console.log('Table "product" failed or empty, trying "products"...');
            const { data: altData, error: altError } = await supabase.from('products').select('*');
            if (altData && altData.length > 0) {
                data = altData;
                error = altError;
            }
        }

        if (error) {
            console.error('❌ Supabase Fetch Error:', error.message);
            return constans;
        }

        if (!data || data.length === 0) {
            console.warn('⚠️ No products found in any table.');
            return constans;
        }

        return data.map(item => {
            // محاولة استخراج البيانات من عمود json أو product أو الحقول نفسها
            const productData = item.json || item.product || item;

            // التأكد من أننا نحصل على كائن
            const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;

            return {
                ...finalData,
                id: finalData.id || item.id,
                name: finalData.name || item.name || "منتج بدون اسم",
                price: Number(finalData.price || item.price) || 0,
                discount: Number(finalData.discount || item.discount) || 0,
                code: finalData.code || item.code || "---",
                image: finalData.image || item.image || "https://placehold.co/600x400/png"
            } as Product;
        });
    } catch (e) {
        console.error("❌ Unexpected error in getProducts:", e);
        return constans;
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        // المحاولة الأولى: جدول product
        let { data, error } = await supabase
            .from('product')
            .select('*')
            .or(`id.eq."${id}",json->>id.eq."${id}"`)
            .maybeSingle();

        // المحاولة الثانية: جدول products (إذا فشل الأول أو لم يجد نتيجة)
        if (!data) {
            const { data: altData } = await supabase
                .from('products')
                .select('*')
                .or(`id.eq."${id}",product->>id.eq."${id}"`)
                .maybeSingle();
            if (altData) data = altData;
        }

        if (data) {
            const productData = data.json || data.product || data;
            const finalData = typeof productData === 'string' ? JSON.parse(productData) : productData;

            return {
                ...finalData,
                id: finalData.id || data.id,
                name: finalData.name || data.name || "منتج بدون اسم",
                price: Number(finalData.price || data.price) || 0,
                discount: Number(finalData.discount || data.discount) || 0,
                code: finalData.code || data.code || "---",
                image: finalData.image || data.image || "https://placehold.co/600x400/png"
            } as Product;
        }
    } catch (e) {
        console.error("❌ Unexpected error in getProductById:", e);
    }

    const fallback = constans.find(p => p.id === id);
    return fallback || null;
}
