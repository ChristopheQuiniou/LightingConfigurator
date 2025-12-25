import type { Route } from "./+types/configure.($id)";
import { getProduct } from "~/features/product/productAPI";

export async function loader({ params }: Route.LoaderArgs) {
    const { data, error } = await getProduct(params.id ?? "");

    if (error) {
        return { error: error.message };
    }
    return { result: data };
}

import Viewer3D from "~/features/configurator/components/Viewer3D";
import ConfigPanel from "~/features/configurator/components/ConfigPanel";
import TopBar from "~/features/configurator/components/TopBar";
import Footer from "~/features/configurator/components/Footer";
import { Provider } from "mobx-react";
import { configurationProvider } from "~/features/configurator/context/configurationProvider";
import { ProductModel } from "~/features/product/models/productModel";
import { ProductAdapter } from "~/features/product/adapter/productAdapter";

export default function Configure({ loaderData }: Route.ComponentProps) {
    const { result, error } = loaderData;

    if (!error && result.success) {
        //const selectedProduct: IProduct = result.data;
        const mainProduct = new ProductModel(ProductAdapter(result.data))
        configurationProvider.createConfiguration(mainProduct);
    }

    return (
        <Provider configurationContext={configurationProvider.getCurrentConfiguration()}>
            <TopBar />
            <main className="px-0">
                <div className="border-y border-slate-200">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
                        <Viewer3D />
                        <ConfigPanel />
                    </div>
                </div>
            </main>
            <Footer />
        </Provider>
    );
}


