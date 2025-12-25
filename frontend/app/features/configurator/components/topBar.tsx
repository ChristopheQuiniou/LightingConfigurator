import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { configurationProvider } from "../context/configurationProvider";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}


const TopBar = observer(() => {

    const configuration = configurationProvider.getCurrentConfiguration();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mainProduct = configuration.products[0] ?? {};
    const navigate = useNavigate();

    const save = () => {
        console.log("save");
    }

    const QuitConfigurator = () => {
        navigate(-1);
    }

    const purchase = () => {
        console.log("Purchase !");
    }

    const GoToStep = (i: number) => {
        console.log("next step id ", i);
        const nextStep = configuration.steps.find((step) => step.id == i);
        if (nextStep)
            configuration.currentStep = nextStep.id;
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
            <div className="px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-slate-900" />
                        <div className="leading-tight">
                            <div className="text-sm font-semibold">Configurator</div>
                            <div className="text-xs text-slate-500">
                                Step {configuration.currentStep + 1} of {configuration.steps.length}:{" "}
                                <span className="font-medium text-slate-700">{configuration.steps[configuration.currentStep].label}</span>
                            </div>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-2">
                        {configuration.steps.map((s, i) => {
                            const isActive = i === configuration.currentStep;
                            const isDone = i < configuration.currentStep;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => GoToStep(i)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1 text-xs font-medium",
                                        isActive
                                            ? "bg-slate-900 text-white"
                                            : isDone
                                                ? "bg-slate-100 text-slate-900"
                                                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "grid h-5 w-5 place-items-center text-[11px]",
                                            isActive
                                                ? "bg-white/15 text-white"
                                                : isDone
                                                    ? "bg-slate-900 text-white"
                                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                                        )}
                                    >
                                        {isDone ? "✓" : i + 1}
                                    </span>
                                    {s.label}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="md:hidden border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                            aria-label="Open steps menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="steps-menu"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="block h-[2px] w-5 bg-slate-900" />
                            <span className="mt-1 block h-[2px] w-5 bg-slate-900" />
                            <span className="mt-1 block h-[2px] w-5 bg-slate-900" />
                        </button>

                        <button
                            type="button"
                            onClick={QuitConfigurator}
                            className="border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                        >
                            Quit
                        </button>

                        <button
                            type="button"
                            onClick={save}
                            className="border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Mobile menu: steps + checkout */}
                <div
                    id="steps-menu"
                    className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}
                >
                    <div className="mt-3 border border-slate-200 bg-white">
                        {configuration.steps.map((s, i) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => GoToStep(i)}
                                className="w-full border-b border-slate-200 px-4 py-3 text-left text-sm hover:bg-slate-50"
                            >
                                {i + 1}. {s.label}
                            </button>
                        ))}

                        <div className="border-t border-slate-200 px-4 py-4">
                            <div className="text-sm font-semibold">{mainProduct.name}</div>
                            <div className="mt-1 text-xs text-slate-500">{mainProduct.description}</div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <div>
                                    <div className="text-xs text-slate-500">Total</div>
                                    <div className="text-lg font-semibold">${configuration.totalPrice.toFixed(2)}</div>
                                </div>

                                <button
                                    className={cn(
                                        "px-5 py-3 text-sm font-semibold text-white",
                                        configuration.canPurchase() ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-300 cursor-not-allowed"
                                    )}
                                    onClick={purchase}
                                    disabled={!configuration.canPurchase}
                                >
                                    Purchase
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-4 w-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
});

export default TopBar;