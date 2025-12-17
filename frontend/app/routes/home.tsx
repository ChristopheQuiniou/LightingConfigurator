import { Link, NavLink } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Lightning configurator v1" },
  ];
}

export default function Home() {
  return <>
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Configure LED strip setups by use-case
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Find the right LED strip setup —
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            {" "}
            in seconds.
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
          Browse pre-made lightning configurations for <span className="text-slate-100">gaming</span>,{" "}
          <span className="text-slate-100">pro installs</span>, and{" "}
          <span className="text-slate-100">home lighting</span> furnitures.
          Get a price as you go.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400"
          >
            Make my configuration
          </Link>

        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-slate-100 font-semibold">Fast</div>
            <div>Pick a furniture & go</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-slate-100 font-semibold">Practical</div>
            <div>No tapemeasure required</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-slate-100 font-semibold">Clean UI</div>
            <div>Easy to configure</div>
          </div>
        </div>
      </div>

      {/* Mock preview card */}
      <div className="relative">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Featured</div>
              <div className="text-xs text-slate-400">Popular configurations</div>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              v0.1
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {[
              { title: "Gaming Desk Underglow", cat: "gaming", tag: "RGBIC" },
              { title: "TV Bias Lighting", cat: "gaming", tag: "Eye comfort" },
              { title: "Kitchen Under-Cabinet", cat: "home", tag: "Task light" },
              { title: "Retail Signage Backlight", cat: "pro", tag: "Bright" },
            ].map((x) => (
              <div
                key={x.title}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3"
              >
                <div>
                  <div className="text-sm font-semibold">{x.title}</div>
                  <div className="mt-0.5 text-xs text-slate-400 capitalize">{x.cat}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                    {x.tag}
                  </span>
                  <span className="text-slate-400">→</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/products"
              className="block w-full rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-100"
            >
              Browse all configs
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Features */}
    <section id="features" className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight">What this project is</h2>
      <p className="mt-2 max-w-2xl text-slate-300">
        This project is designed to showcase my full-stack skills. It’s an e-commerce app where users can configure a furniture lighting kit in the Lightning Configurator, then purchase that custom kit through the shop. I built the platform with the MERN stack, integrated Three.js for the 3D configurator, Stripe for payments, and OAuth2 for secure sign-in.
      </p>

      
    </section>

  

    {/* How it works */}
    <section id="how" className="mt-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Select a product", d: "Go to the configurator list." },
            { n: "02", t: "Put the leds strips where you want", d: "You can even add options like smooth light up." },
            { n: "03", t: "Order", d: "Use our stripe integration to purchase safely" },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
              <div className="text-xs text-slate-400">{s.n}</div>
              <div className="mt-1 text-sm font-semibold">{s.t}</div>
              <div className="mt-2 text-sm text-slate-300">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            Let's go configure
          </Link>
          
        </div>
      </div>
    </section>
  </>;
}
