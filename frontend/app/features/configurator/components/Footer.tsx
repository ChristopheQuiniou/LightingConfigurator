import { useSnapshot } from "valtio";
import { observer } from "mobx-react";
import { configurationProvider } from "../context/configurationProvider";

const Footer = observer(() => {

    const configuration = configurationProvider.getCurrentConfiguration();
    const currentProduct = configuration.products[0] ?? {};

    return (
        <footer className="sticky bottom-0 z-40 hidden border-t border-slate-200 bg-white md:block">
            <div className="px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{currentProduct.name}</div>
                        <div className="line-clamp-2 text-xs text-slate-500">
                            {currentProduct.description}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <div className="text-right">
                            <div className="text-xs text-slate-500">Total</div>
                            <div className="text-lg font-semibold">
                                ${configuration.totalPrice.toFixed(2)}
                            </div>
                        </div>

                        {configuration.canPurchase() ? <button className="bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
                            Purchase
                        </button> : <></>}

                    </div>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
