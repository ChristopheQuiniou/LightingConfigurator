import { createContext } from 'react';
import type { ConfigurationContextType, Step, Steps } from '../types/types';
import { proxy } from 'valtio';
import type { Product } from '~/features/product/types/types';

/* export const ConfiguratorContext = createContext({
    currentStep: {id: 0, label: "Shape"},
    steps: [
        {id: 0, label: "Shape"},
        {id: 1, label: "Color"},
        {id: 2, label: "Options"}
    ],
    BOM: [],
    totalPrice: 100,
    canPurchase: false,
    product: {
        _id: "dssdfsdfsfsdfsdf" ,
        name: "Gate",
        description: "Gate with water fountain",
        category: "outdoor",
        imageURL: "",
        createdAt: "",
        updatedAt: "",
        __v: 1
    }
}); */


/* export const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined); */

export const ConfigurationContext = proxy<{
    root:{
        currentStep: Step,
        steps: Steps,
        totalPrice: number,
        canPurchase: boolean,
        products: Array<Product>
    }
}>();
