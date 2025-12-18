import type { Dispatch } from "@reduxjs/toolkit";
import type { SetStateAction } from "react";
import type { Product } from "~/features/product/types/types";

export type Step = { id: number; label: string };

export type Steps = Array<Step>;

export type ConfigurationContextType = {
    currentStep: Step,
    steps: Steps,
    totalPrice: number,
    canPurchase: boolean,
    products: Array<Product>
}