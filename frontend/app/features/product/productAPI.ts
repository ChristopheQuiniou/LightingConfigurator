import { redirect } from "react-router";
import type { Product, ProductSearchOptions } from "./types/types";

export async function getProduct(id : String) {
    try {
        
        const response = await fetch(`http://localhost:3000/api/v1/products/${id}`,{
            method: "GET", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Tell the server you're sending JSON
            },
        });

        if (!response.ok) {
            return {error: {message:"Product search error"}};
        }

        const json = await response.json();
        if (!json.success){
            return {error: {message:json.message}};
        }

        return {data:json};
    } catch (err) {
        return {error: {message: err ?? "Unknown error"}};
    }
}

export async function getProducts(options : ProductSearchOptions) {
    try {
        
        const searchParams = new URLSearchParams(options as any); 
        const response = await fetch(`http://localhost:3000/api/v1/products?${searchParams}`,{
            method: "GET", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Tell the server you're sending JSON
            },
        });

        if (!response.ok) {
            return {error: {message:"Product search error"}};
        }

        const json = await response.json();
        if (!json.success){
            return {error: {message:json.message}};
        }

        return {data:json};
    } catch (err) {
        return {error: {message: err ?? "Unknown error"}};
    }
}

export async function postProduct(product : Product) {
    try {
        const response = await fetch("http://localhost:3000/api/v1/products",{
            method: "POST", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Tell the server you're sending JSON
            },
            body: JSON.stringify(product), // Convert JS object to JSON string
        });

        if (!response.ok) {
            return {error: "Product not created"};
        }

        const json = await response.json();
        if (!json.success){
            return {error: json.message};
        }
    } catch (err) {
        console.log(err);
        return {error: "Product not created"};
    }
    
    
}