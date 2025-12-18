/* import { use, useState, type ReactNode } from "react";
import { ConfigurationContext } from "./configurationContext";
import { label } from "three/tsl";
import type { ConfigurationContextType, Step, Steps } from "../types/types";

export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {

    const [currentStep, setCurrentStep] = useState<Step>({ id: 0, label: "Shape" });
    const steps: Steps = [
        { id: 0, label: "Shape" },
        { id: 1, label: "Color" },
        { id: 2, label: "Options" }
    ];

    //Definition of the context here
    const ctx: ConfigurationContextType = {
        currentStep: currentStep,
        setCurrentStep: setCurrentStep,
        steps: steps,
        totalPrice: 100,
        canPurchase: false,
        products: [
            {
                _id: "dssdfsdfsfsdfsdf",
                name: "Gate",
                description: "Gate with water fountain",
                category: "outdoor",
                imageURL: "",
                createdAt: "",
                updatedAt: "",
                __v: 1
            }
        ]
    };

    return (
        <ConfigurationContext value={ctx}>
            {children}
        </ConfigurationContext>
    );
};

export const useConfiguration = () => {
    const ctx = use(ConfigurationContext);
    if (!ctx) {
        throw new Error("Undefined configuration context");
    }
    return ctx;
} */