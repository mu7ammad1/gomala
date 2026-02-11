"use server";

import { supabase } from "@/lib/supabase";
import { Product } from "@/types/supabase";


export async function getProducts(): Promise<Product[]> {
    try {
        console.log('--- Fetching Products ---');

        // المحاولة الأولى: جدول product
        let { data, error } = await supabase.from('products').select('*');

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
            return [];
        }

        if (!data || data.length === 0) {
            console.warn('⚠️ No products found in any table.');
            return [];
        }

        return data.map(item => {
            const productData = item.json || item.product || item;
            const parsedData = typeof productData === 'string' ? JSON.parse(productData) : productData;

            return {
                id: item.id,
                created_at: item.created_at ? new Date(item.created_at) : new Date(),
                json: {
                    id: parsedData.id || item.id,
                    code: Number(parsedData.code) || 0,
                    name: parsedData.name || item.name || "منتج بدون اسم",
                    image: parsedData.image || item.image || "https://placehold.co/600x400/png",
                    price: Number(parsedData.price || item.price) || 0,
                    discount: Number(parsedData.discount || item.discount) || 0,
                    gallery: Array.isArray(parsedData.gallery) ? parsedData.gallery : [],
                    reviews: Array.isArray(parsedData.reviews) ? parsedData.reviews : [],
                    description: parsedData.description || ""
                }
            } as Product;
        });
    } catch (e) {
        console.error("❌ Unexpected error in getProducts:", e);
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    try {
        // المحاولة الأولى: جدول product
        let { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`id.eq."${id}",json->>id.eq."${id}"`)
            .maybeSingle();

        if (data) {
            const productData = data.json || data.product || data;
            const parsedData = typeof productData === 'string' ? JSON.parse(productData) : productData;

            return {
                id: data.id,
                created_at: data.created_at ? new Date(data.created_at) : new Date(),
                json: {
                    id: parsedData.id || data.id,
                    code: Number(parsedData.code) || 0,
                    name: parsedData.name || data.name || "منتج بدون اسم",
                    image: parsedData.image || data.image || "https://placehold.co/600x400/png",
                    price: Number(parsedData.price || data.price) || 0,
                    discount: Number(parsedData.discount || data.discount) || 0,
                    gallery: Array.isArray(parsedData.gallery) ? parsedData.gallery : [],
                    reviews: Array.isArray(parsedData.reviews) ? parsedData.reviews : [],
                    description: parsedData.description || ""
                }
            } as Product;
        }
    } catch (e) {
        console.error("❌ Unexpected error in getProductById:", e);
    }

    return null;
}
