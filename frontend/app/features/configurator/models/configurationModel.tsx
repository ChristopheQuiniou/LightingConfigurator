import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { StepModel } from "./stepModel";
import { ProductModel } from "~/features/product/models/productModel";

export class ConfigurationModel {

    id = "";
    currentStep = 0;
    steps: StepModel[] = [];
    totalPrice = 0;
    canPurchase = () => this.totalPrice > 2 ? true : false;
    products: ProductModel[] = [];

    constructor(mainProduct: ProductModel) {
        this.id = uuidv4();
        this.steps = [
            new StepModel({ id: 0, label: "Shape" }),
            new StepModel({ id: 1, label: "Color" }),
            new StepModel({ id: 2, label: "Options" })
        ];
        this.products = [
            mainProduct
        ];

        makeAutoObservable(this);
    }

    mainProduct(): ProductModel {
        return this.products[0];
    }

    getID(): string {
        return this.id;
    }

};