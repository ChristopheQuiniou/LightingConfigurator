import { observer } from "mobx-react";
import type { JSX, PropsWithChildren } from "react";
import { useConfiguration } from "../provider/configurationProvider";

export interface IConfigStep extends PropsWithChildren {
};

export const ConfigStepOne = observer(({ children }: IConfigStep): JSX.Element => {
    const configuration = useConfiguration();

    return (
        <>
            <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                    Length
                </label>
                <input
                    type="number"
                    defaultValue={configuration.mainProduct().dimensions.length}
                    onChange={(e) => {
                        configuration.mainProduct().dimensions.length = parseInt(e.target.value);
                    }}
                    className="w-full border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    placeholder="e.g. 120"
                />
            </div>
            <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                    Width
                </label>
                <input
                    type="number"
                    defaultValue={configuration.mainProduct().dimensions.width}
                    onChange={(e) => {
                        configuration.mainProduct().dimensions.width = parseInt(e.target.value);
                    }}
                    className="w-full border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    placeholder="e.g. 120"
                />
            </div>
            <div>
                <label className="mb-2 block text-xs font-medium text-slate-600">
                    Height
                </label>
                <input
                    type="number"
                    defaultValue={configuration.mainProduct().dimensions.height}
                    onChange={(e) => {
                        configuration.mainProduct().dimensions.height = parseInt(e.target.value);
                    }}
                    className="w-full border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    placeholder="e.g. 120"
                />
            </div>
        </>
    );
});


export const ConfigStepTwo = observer(({ children }: IConfigStep): JSX.Element => {
    const configuration = useConfiguration();

    return (
        <>
            {children}
        </>
    );
});

export const ConfigStepThree = observer(({ children }: IConfigStep): JSX.Element => {
    const configuration = useConfiguration();

    return (
        <>
            {children}
        </>
    );
});