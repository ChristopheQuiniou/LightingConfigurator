import type { ChangeEvent, FormEvent } from "react";
import type { Route } from "./+types/_landingpage.products._index";
import { getProducts } from "~/features/product/productAPI";
import { ProductCategories, type Product, type ProductSearchOptions } from "~/features/product/types/types";
import { useRef, useState } from "react";
import { Link, useSubmit } from "react-router";
import { capitalize } from "~/utils/utils";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Step 1 : Products" },
    { name: "description", content: "Lightning configurator v1" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const options = Object.fromEntries(new URLSearchParams(url.searchParams));
  const { data, error } = await getProducts(options as ProductSearchOptions);

  if (error) {
    return { error: error.message };
  }

  return { result: data, optionsUsed: options };
}

export default function ProductsIndex({ loaderData }: Route.ComponentProps) {
  const { error, result } = loaderData;

  const products: Product[] = result?.data ?? [];
  const count = result?.pagination?.productsCount ?? 0;

  const formRef = useRef<HTMLFormElement>(null);
  const formId = "product-filter-form";
  const submit = useSubmit();

  const [formData, setFormData] = useState({
    search: loaderData?.optionsUsed?.search ?? "",
    category: loaderData?.optionsUsed?.category ?? "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      search: "",
      category: "",
    });
    // Re-run the loader without query params
    submit(null, { method: "get", action: "/products", replace: true });
  };

  return (
    <div className="mx-auto max-w-6xl p-6">

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Step 1
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100">
            Pick your product
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              to configure.
            </span>
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Products found: <span className="font-semibold text-slate-100">{count}</span>
          </p>
        </div>

        <button
          onClick={() => formRef.current?.reset()}
          form={formId}
          type="reset"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Filter bar (dark style) */}
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
        <form
          id={formId}
          ref={formRef}
          method="get"
          role="search"
          onReset={handleReset}
          className="flex flex-col gap-3"
        >
          {/* Row 1: Search + button */}
          <div className="flex items-stretch gap-3">
            <div className="relative flex-1">
              {/* Bigger icon */}
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-xl text-lg text-slate-200">
                ⌕
              </span>

              <input
                type="search"
                name="search"
                value={formData.search}
                onChange={handleChange}
                placeholder="Search by name or description…"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/30 pl-14 pr-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-indigo-400/40"
              />
            </div>

            <button
              type="submit"
              className="shrink-0 rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Row 2: Category under (NOT full width on bigger screens) */}
          <div className="w-full sm:w-64">
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-slate-200"
            >
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/30 px-3 py-3 text-sm text-slate-100 outline-none focus:border-indigo-400/40"
            >
              {ProductCategories.map((c) => (
                <option key={c} value={c === "all" ? "" : c} className="bg-slate-950">
                  {capitalize(c)}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: any) => (
          <Link
            key={product._id ?? product.name}
            type="button"
            to={`/configure/${product._id}`}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 text-left shadow-2xl transition hover:bg-white/10"
          >
            {/* Image */}
            {product.imageURL ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30">
                <img
                  src={product.imageURL}
                  alt={product.name ? product.name : "no name"}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="mb-1 flex h-44 w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/30 text-sm text-slate-500">
                No image
              </div>
            )}

            {/* Text */}
            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs text-slate-400">
                  {(product.category || "Uncategorized").toString()}
                </div>
                <div className="mt-1 truncate text-base font-semibold text-slate-100">
                  {product.name}
                </div>
              </div>

              <span className="shrink-0 rounded-full border border-white/10 bg-slate-950/30 px-3 py-1 text-xs text-slate-200">
                Configure <span className="text-slate-400">→</span>
              </span>
            </div>

            {product.description && (
              <p className="mt-2 line-clamp-3 text-sm text-slate-300">
                {product.description}
              </p>
            )}

            {/* little hint */}
            <div className="mt-4 text-xs text-slate-500">
              Click to open configurator
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {count === 0 && !error && (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-300">
          No products match your filters.
        </div>
      )}
    </div>
  );
}
