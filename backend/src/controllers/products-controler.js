import mongoose from "mongoose";
import APIError from "../middlewares/api-error.js";
import Product from "../models/product-schema.js";

export const getProduct = async (req,res,next) => {
    try {

        const id = req.params.id;

        if (!id) {
            throw new APIError(401,"Missing id for the product");
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new APIError(400,"Invalid product id");
        }

        const product = await Product.findById(id);
        if (!product) {
            throw new APIError(404,"Product not found");
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
}

export const getProducts = async (req,res,next) => {
    try {

        const {
            category,
            search,
            sort = "-createdAt",
            limit= 20,
            page = 1,    
        } = req.query;

        const filter = {};

        if (category) filter.category = category;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "ix" } },
                { description: { $regex: search, $options: "ix" } }
            ];
        }

        const maxLimit = 200;
        if (limit > maxLimit) {
            limit = maxLimit;
        }
        
        const products = await Product.find(filter).sort(sort).limit(parseInt(limit)).skip((page - 1) * limit);
        const productsCount = await Product.countDocuments(filter);
        res.status(200).json({
            success: true,
            pagination: {
                productsCount: productsCount,
                page: parseInt(page),
                pageCount: Math.ceil(productsCount / limit)
            },
            data: products
        });
    } catch (error) {
        next(error);
    }
}

export const createProduct = async (req,res,next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            success: true,
            message: "Product created!",
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
}
