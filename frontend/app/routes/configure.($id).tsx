import type { Route } from "./+types/configure.($id)";
import { getProduct } from "~/features/product/productAPI";

export async function loader({ params } : Route.LoaderArgs) {
    const { data, error } = await getProduct(params.id ?? "");
  
    if (error) {
      return { error: error.message };
    }
    return { result: data};
}

export default function Configure({ loaderData }: Route.ComponentProps) {
    const {error,result} = loaderData;

    return (
        <>
            {error && (
                <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
                </div>
            )}

            <h1>Product to configure</h1>
            {result?.data?.name ?? "Custom product"}
            <p>{result?.data?.description ?? "Custom product"}</p>
        </>
    );
}


