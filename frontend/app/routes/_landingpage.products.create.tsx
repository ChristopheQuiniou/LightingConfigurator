import { redirect, type ActionFunctionArgs } from "react-router";
import type { Route } from "./+types/_landingpage.products.create";
import { postProduct } from "~/features/product/productAPI";
import type { Product } from "~/features/product/types/types";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Create a product" },
    { name: "description", content: "Lightning configurator v1" },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const imageURL = formData.get("imageURL") as string;

  let errors = {};

  if (!name) {
    return { error: "Name required" };
  }

  if (!description) {
    return { error: "Description required" };
  }

  const result = await postProduct({ name, description, category, imageURL } as Product);

  if (result?.error) {
    return { error: result.error };
  }

  return redirect("/");
}

export default function CreateProduct() {
  return <>
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-2xl font-bold">Backoffice · Create Product</h1>
      <p className="mt-2 text-sm text-slate-300">
        Add a product (where people install LED strips).
      </p>

      <form
        method="post"
        className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
      >
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            name="name"
            placeholder="e.g. TV Backlight Strip"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-400/50"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            name="category"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm outline-none focus:border-indigo-400/50"
          >
            <option value="gaming" className="bg-slate-950">
              Gaming
            </option>
            <option value="pro" className="bg-slate-950">
              Pro
            </option>
            <option value="home" className="bg-slate-950">
              Home
            </option>
            <option value="outdoor" className="bg-slate-950">
              Outdoor
            </option>
            <option value="automotive" className="bg-slate-950">
              Automotive
            </option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Short description: where it goes, why it’s useful."
            rows={5}
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-400/50"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Image URL (optional)</label>
          <input
            name="imageURL"
            placeholder="https://..."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-400/50"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          Save product
        </button>
      </form>
    </div>
  </>;
}