export interface Category {
    id: string;
    name?: string;
    slug?: string;
    image_url?: string | null;
    created_at?: string;
};

export interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Category | null;
};