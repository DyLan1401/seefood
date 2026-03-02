export type Product = {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    sale_price: number | null;
    stock: number;
    image_url: string | null;
    created_at: string;
};