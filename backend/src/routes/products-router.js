import express from "express"
import {getProducts,createProduct} from "../controllers/products-controler.js";
const productRouter = express.Router();

productRouter.get("/",getProducts);
productRouter.post("/",createProduct);

export default productRouter;