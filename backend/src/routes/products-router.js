import express from "express"
import {getProducts, getProduct, createProduct} from "../controllers/products-controler.js";
const productRouter = express.Router();

productRouter.get("/",getProducts);
productRouter.get("/:id",getProduct);
productRouter.post("/",createProduct);

export default productRouter;