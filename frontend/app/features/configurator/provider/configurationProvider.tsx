import { createContext, use, useContext, type PropsWithChildren } from "react";
import { ConfigurationModel } from "../models/configurationModel";

const ConfigurationContext = createContext<ConfigurationModel | null>(null);

export interface IConfigurationProvider extends PropsWithChildren {
    model: ConfigurationModel | undefined
}

export const ConfigurationProvider = ({ model, children }: IConfigurationProvider) => {

    if (!model) {
        throw new Error("Undefined model for the provider");
    }

    return (
        <ConfigurationContext.Provider value={model}>
            {children}
        </ConfigurationContext.Provider>
    );
};


export const useConfiguration = () => {
    // If 'use' isn't working, revert to useContext
    const context = typeof use === "function"
        ? use(ConfigurationContext)
        : useContext(ConfigurationContext);

    if (!context) throw new Error("useConfiguration must be used within a ConfigurationProvider");
    return context;
};