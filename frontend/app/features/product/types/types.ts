
export type ProductSearchOptions = {
    category?: string | null | undefined,
    search?: string | null | undefined,
    sort?: string | null | undefined,
    limit?: string | null | undefined,
    page?: string | null | undefined,
};

export const ProductCategories = ["all","gaming","pro","home","outdoor","automotive"];

export type Product = {
    _id: string,
    name: string,
    description: string,
    category: string,
    imageURL: string,
    createdAt: string,
    updatedAt: string,
    __v: number
};