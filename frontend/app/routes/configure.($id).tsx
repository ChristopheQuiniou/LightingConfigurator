import { useMemo, useState } from "react";
import type { Route } from "./+types/configure.($id)";
import { getProduct } from "~/features/product/productAPI";

export async function loader({ params }: Route.LoaderArgs) {
    const { data, error } = await getProduct(params.id ?? "");

    if (error) {
        return { error: error.message };
    }
    return { result: data };
}

type Step = { id: string; label: string };

const STEPS: Step[] = [
    { id: "size", label: "Size" },
    { id: "color", label: "Color" },
    { id: "power", label: "Power" },
    { id: "extras", label: "Extras" },
    { id: "review", label: "Review" },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export function ConfiguratorLayoutFullWidth() {
    const [currentStepIndex, setCurrentStepIndex] = useState(1);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const product = useMemo(
        () => ({
            name: "Aurora Shelf Kit",
            description:
                "LED kit tailored to your furniture. Choose size, color temp, and extras for the perfect glow.",
            price: 149.0,
        }),
        []
    );

    const currentStep = STEPS[currentStepIndex];

    const goToStep = (idx: number) => {
        setCurrentStepIndex(idx);
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-dvh bg-white text-slate-900">
            {/* Top stepper / burger */}
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
                <div className="px-4 py-3 sm:px-6">
                    <div className="flex items-center justify-between gap-3">
                        {/* Left brand */}
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-slate-900" />
                            <div className="leading-tight">
                                <div className="text-sm font-semibold">Configurator</div>
                                <div className="text-xs text-slate-500">
                                    Step {currentStepIndex + 1} of {STEPS.length}:{" "}
                                    <span className="font-medium text-slate-700">{currentStep.label}</span>
                                </div>
                            </div>
                        </div>

                        {/* Desktop stepper */}
                        <nav className="hidden md:flex items-center gap-2">
                            {STEPS.map((s, i) => {
                                const isActive = i === currentStepIndex;
                                const isDone = i < currentStepIndex;

                                return (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => goToStep(i)}
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

                        {/* Right actions (quit + save + mobile burger) */}
                        <div className="flex items-center gap-2">
                            {/* Burger (mobile only) */}
                            <button
                                type="button"
                                className="md:hidden border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
                                aria-label="Open steps menu"
                                aria-expanded={mobileMenuOpen}
                                aria-controls="steps-menu"
                                onClick={() => setMobileMenuOpen((v) => !v)}
                            >
                                <span className="block h-[2px] w-5 bg-slate-900" />
                                <span className="mt-1 block h-[2px] w-5 bg-slate-900" />
                                <span className="mt-1 block h-[2px] w-5 bg-slate-900" />
                            </button>

                            {/* Quit */}
                            <button
                                type="button"
                                onClick={() => {
                                    // put your navigation here (remix: useNavigate, next: router.push, etc.)
                                    // e.g. navigate("/products");
                                    console.log("quit");
                                }}
                                className="border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                            >
                                Quit
                            </button>

                            {/* Save */}
                            <button
                                type="button"
                                onClick={() => {
                                    // persist config / draft
                                    console.log("save");
                                }}
                                className="border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Mobile dropdown steps */}
                    <div
                        id="steps-menu"
                        className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}
                    >
                        <div className="mt-3 border border-slate-200 bg-white">
                            {STEPS.map((s, i) => {
                                const isActive = i === currentStepIndex;
                                const isDone = i < currentStepIndex;

                                return (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => goToStep(i)}
                                        className={cn(
                                            "w-full border-b border-slate-200 px-4 py-3 text-left text-sm hover:bg-slate-50",
                                            isActive && "bg-slate-50"
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={cn(
                                                        "grid h-6 w-6 place-items-center border text-xs",
                                                        isActive
                                                            ? "border-slate-900 bg-slate-900 text-white"
                                                            : isDone
                                                                ? "border-slate-900 bg-white text-slate-900"
                                                                : "border-slate-200 bg-white text-slate-700"
                                                    )}
                                                >
                                                    {isDone ? "✓" : i + 1}
                                                </span>
                                                <span className={cn(isActive ? "font-semibold" : "font-medium")}>
                                                    {s.label}
                                                </span>
                                            </div>

                                            {isActive && (
                                                <span className="text-xs font-medium text-slate-500">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}

                            {/* Mobile "footer" content inside the menu */}
                            <div className="border-t border-slate-200 px-4 py-4">
                                <div className="text-sm font-semibold">{product.name}</div>
                                <div className="mt-1 text-xs text-slate-500">{product.description}</div>

                                <div className="mt-3 flex items-center justify-between gap-3">
                                    <div>
                                        <div className="text-xs text-slate-500">Total</div>
                                        <div className="text-lg font-semibold">
                                            ${product.price.toFixed(2)}
                                        </div>
                                    </div>

                                    <button className="bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
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

            {/* Main split area (full width, no max-w) */}
            <main className="px-0">
                <div className="border-y border-slate-200">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
                        {/* Left: Canvas */}
                        <section className="relative min-h-[55vh] lg:min-h-[calc(100dvh-220px)]">
                            {/* Replace this with your <Canvas> */}
                            <div className="absolute inset-0 grid place-items-center">
                                <div className="text-center">
                                    <div className="text-lg font-semibold">React Three Fiber</div>
                                    <div className="text-sm text-slate-500">
                                        Your 3D preview goes here
                                    </div>
                                </div>
                            </div>

                            <div className="absolute left-4 top-4 flex items-center gap-2">
                                <button className="border border-slate-200 bg-white px-3 py-2 text-xs hover:bg-slate-50">
                                    Reset view
                                </button>
                                <button className="border border-slate-200 bg-white px-3 py-2 text-xs hover:bg-slate-50">
                                    Screenshot
                                </button>
                            </div>
                        </section>

                        {/* Right: Inputs with divider border-left */}
                        <aside className="border-t border-slate-200 lg:border-t-0 lg:border-l bg-white">
                            <div className="p-4 lg:sticky lg:top-[72px] lg:h-[calc(100dvh-220px)] lg:overflow-auto">
                                <div className="mb-4">
                                    <div className="text-sm font-semibold">{currentStep.label}</div>
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
                                            onClick={() => setCurrentStepIndex((v) => Math.max(0, v - 1))}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="w-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                                            onClick={() =>
                                                setCurrentStepIndex((v) => Math.min(STEPS.length - 1, v + 1))
                                            }
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="sticky bottom-0 z-40 hidden border-t border-slate-200 bg-white md:block">
                <div className="px-4 py-4 sm:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <div className="truncate text-sm font-semibold">{product.name}</div>
                            <div className="line-clamp-2 text-xs text-slate-500">
                                {product.description}
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                            <div className="text-right">
                                <div className="text-xs text-slate-500">Total</div>
                                <div className="text-lg font-semibold">
                                    ${product.price.toFixed(2)}
                                </div>
                            </div>

                            <button className="bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function Configure({ loaderData }: Route.ComponentProps) {
    const { error, result } = loaderData;

    return (
        <>
            {/* {error && (
                <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
                </div>
            )}

            <h1>Product to configure</h1>
            {result?.data?.name ?? "Custom product"}
            <p>{result?.data?.description ?? "Custom product"}</p> */}

            <ConfiguratorLayoutFullWidth />

        </>
    );
}


