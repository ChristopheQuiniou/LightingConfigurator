import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Lightning configurator v1" },
  ];
}

export default function About() {
  return <></>
}