import { Outlet } from "react-router";
import type { Route } from "./+types/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products" },
    { name: "description", content: "Lightning configurator v1" },
  ];
}

export default function ProductsLayout() {
  return <Outlet />;
}
