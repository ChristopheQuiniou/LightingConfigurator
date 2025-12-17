import { Link } from "react-router";
import type { Route } from "./+types/_landingpage.$";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404" },
    { name: "description", content: "Page not found Lightning configurator v1" },
  ];
}

export default function Page404() {
  return <>
    <h1 className="mb-3">Oooh no this page doesn't exists.</h1>
    <Link to="/" className="bg-white
    text-black
    hover:underline
    rounded-xl 
    px-4
    py-2
    text-sm
    font-semibold
    shadow-sm
    border "
    >Go back to home →</Link>
  </>
}