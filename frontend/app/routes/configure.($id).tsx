import type { Route } from "./+types/configure.($id)";
import { getProduct } from "~/features/product/productAPI";

export async function loader({ params }: Route.LoaderArgs) {
    const { data, error } = await getProduct(params.id ?? "");
    return { result: data, error: error?.message };
}

export { default } from "app/features/configurator/view/configuratorView";

