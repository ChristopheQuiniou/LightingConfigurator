import type { Dispatch } from "@reduxjs/toolkit";
import type { SetStateAction } from "react";

export type Product = {
    _id?: string | null ,
    name?: string | null,
    setName?: Function,
    description?: string | null ,
    category?: string | null ,
    imageURL?: string | null ,
    createdAt?: string | null ,
    updatedAt?: string | null ,
    __v?: number | null
};

export type ProductSearchOptions = {
    category?: string | null | undefined,
    search?: string | null | undefined,
    sort?: string | null | undefined,
    limit?: string | null | undefined,
    page?: string | null | undefined,
}

export const ProductCategories = ["all","gaming","pro","home","outdoor","automotive"];