import { DimensionsModel } from "../models/dimensionsModel";
import { ProductModel } from "../models/productModel";

export function ProductAdapter (data : any) : ProductModel {

    return new ProductModel({
        id: data._id ?? "nop",
        name: data.name ?? "no name",
        description: data.description ?? "No description",
        dimensions: new DimensionsModel(1,2,3),
        category: data.category ?? "all",
        imageURL: data.imageURL ?? "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-18055.jpg",
        createdAt: data.createdAt ?? "",
        updatedAt: data.updatedAt ?? "",
        __v: data.__v ?? 0
    });

}