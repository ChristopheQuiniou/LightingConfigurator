import { makeAutoObservable } from "mobx";
import { DimensionsModel } from "./dimensionsModel";

export class ProductModel {

    id = "";
    name = "";
    description = "";
    dimensions = new DimensionsModel(1,2,3);
    category = "outdoor";
    imageURL = "";
    createdAt = "";
    updatedAt = "";
    __v = 0

    constructor({
        id,
        name,
        description,
        dimensions,
        category,
        imageURL,
        createdAt,
        updatedAt,
        __v
    } : { 
        id: string,
        name: string,
        description: string,
        dimensions : DimensionsModel,
        category : string,
        imageURL : string,
        createdAt : string,
        updatedAt : string,
        __v : number
    }) {
        makeAutoObservable(this);
        this.id = id;
        this.name = name;
        this.description = description;
        this.dimensions = dimensions;
        this.category = category;
        this.imageURL = imageURL;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.__v = __v;
    }

};