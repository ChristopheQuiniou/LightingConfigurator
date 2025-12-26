import { ProductModel } from "~/features/product/models/productModel";
import { ConfigurationModel } from "../models/configurationModel";
import { createContext, useContext, useEffect, useMemo, useState, type Context } from "react";
import { useLoaderData, useNavigation } from "react-router";
import { ProductAdapter } from "~/features/product/adapter/productAdapter";

function hello() {
    console.log("Hello");
}

export default function ConfiguratorViewModel() {
    const { result, error } = useLoaderData();

    const [configurationModel, setConfigurationModel] = useState<ConfigurationModel | undefined>(undefined);
    const [mainProductModel, setMainProductModel] = useState<ProductModel | undefined>(undefined);

    useEffect(() => {
        if (!error && result.success) {
            const mainProduct = new ProductModel(ProductAdapter(result.data));
            if (mainProduct) {
                setMainProductModel(mainProduct);
                const configuration = new ConfigurationModel(mainProduct);
                setConfigurationModel(configuration);
            }
        }
    },[result,error])

    return ({
        hello,
        error: error,
        isLoading: !configurationModel,
        configurationModel: configurationModel,
        mainProductModel: mainProductModel
    });
};

