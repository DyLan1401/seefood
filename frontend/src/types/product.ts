export interface Product {
    id: string;
    category_id?: number;
    name?: string;
    slug?: string;
    description?: string | null;
    price: number;
    sale_price?: number | null;
    stock?: number;
    image_url?: string;
    origin?: string;
    weight?: string;
    created_at?: string;
}

export interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Product | null;
}