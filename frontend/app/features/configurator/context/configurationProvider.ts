import { ProductModel } from "~/features/product/models/productModel";
import { ConfigurationModel } from "../models/configurationModel";
import { createContext, useContext, type Context } from "react";

class ConfigurationProvider {

    configurationContext : Context<ConfigurationModel> | undefined;
    configuration : ConfigurationModel | undefined;

    constructor() {

    }

    createConfiguration(mainProduct : ProductModel) {
        const configurationStore = new ConfigurationModel(mainProduct);
        this.configurationContext = createContext(configurationStore);
        this.configuration = useContext(this.configurationContext);
    }

    loadConfiguration(configurationID : String) {
        //TODO load from database
        
    }

    getCurrentConfiguration(){
        if (!this.configuration)
            throw new Error("ConfigurationProvider : undefined configuration");
        return this.configuration;
    }

    saveConfiguration() {
        //TODO : save the configuration on the database
    }

};

export const configurationProvider = new ConfigurationProvider();
