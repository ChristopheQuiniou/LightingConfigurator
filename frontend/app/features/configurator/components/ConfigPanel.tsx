import { observer } from "mobx-react";
import type { JSX, PropsWithChildren } from "react";
import React from "react";
import { useConfiguration } from "../provider/configurationProvider";

export interface IConfigPanel extends PropsWithChildren {
};

const ConfigPanel = observer(({ children }: IConfigPanel): JSX.Element => {
    const configuration = useConfiguration();

    return (
        <aside className="border-t border-slate-200 lg:border-t-0 lg:border-l bg-white">
            <div className="p-4 lg:sticky lg:top-[72px] lg:h-[calc(100dvh-220px)] lg:overflow-auto">
                <div className="mb-4">
                    <div className="text-sm font-semibold">{configuration.steps[configuration.currentStep].label}</div>
                    <div className="text-xs text-slate-500">
                        Configure options for this step.
                    </div>
                </div>

                <div className="space-y-4">
                    {
                        React.Children.map(children, (child, index) => {
                            if (index == configuration.currentStep)
                                return child;
                        })
                    }
                    <div className="border border-slate-200 bg-slate-50 p-4">
                        <div className="text-sm font-semibold">Tip</div>
                        <p className="mt-1 text-xs text-slate-600">
                            Mobile menu changes steps; desktop stepper lets you jump too.
                        </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            className="w-full border border-slate-200 bg-white px-4 py-3 text-sm hover:bg-slate-50"
                            onClick={() => configuration.currentStep = Math.max(0, configuration.currentStep - 1)}
                        >
                            Back
                        </button>
                        <button
                            className="w-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                            onClick={() => configuration.currentStep = Math.min(configuration.steps.length - 1, configuration.currentStep + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
    {/* <aside className="border-t border-slate-200 lg:border-t-0 lg:border-l bg-white">
            <div className="p-4 lg:sticky lg:top-[72px] lg:h-[calc(100dvh-220px)] lg:overflow-auto">
                <div className="mb-4">
                    <div className="text-sm font-semibold">{configuration.steps[configuration.currentStep].label}</div>
                    <div className="text-xs text-slate-500">
                        Configure options for this step.
                    </div>
                </div>

                <div className="space-y-4">
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

                    <div>
                        <label className="mb-2 block text-xs font-medium text-slate-600">
                            LED Color
                        </label>
                        <select className="w-full border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100">
                            <option>Warm white</option>
                            <option>Neutral white</option>
                            <option>Cool white</option>
                            <option>RGB</option>
                        </select>
                    </div>

                    <div className="border border-slate-200 bg-slate-50 p-4">
                        <div className="text-sm font-semibold">Tip</div>
                        <p className="mt-1 text-xs text-slate-600">
                            Mobile menu changes steps; desktop stepper lets you jump too.
                        </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            className="w-full border border-slate-200 bg-white px-4 py-3 text-sm hover:bg-slate-50"
                            onClick={() => configuration.currentStep = Math.max(0, configuration.currentStep - 1)}
                        >
                            Back
                        </button>
                        <button
                            className="w-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                            onClick={() => configuration.currentStep = Math.min(configuration.steps.length - 1, configuration.currentStep + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </aside> */}
    //);
});

export default ConfigPanel;