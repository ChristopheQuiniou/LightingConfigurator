import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes({
}) satisfies RouteConfig;
/* export default [
    index("routes/home.tsx"),
    route("products", "routes/products.tsx"),
    route("create-product", "routes/createProduct.tsx"),
    route("about", "routes/about.tsx"),
] satisfies RouteConfig; */
