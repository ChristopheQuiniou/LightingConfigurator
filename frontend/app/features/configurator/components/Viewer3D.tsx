import { Canvas } from "@react-three/fiber";
import { observer } from "mobx-react";
import { configurationProvider } from "../context/configurationProvider";

const Viewer3D = observer(() => {

    const configuration = configurationProvider.getCurrentConfiguration();
    const mainProduct = configuration.products[0] ?? {};
    return (
        <section className="relative min-h-[55vh] lg:min-h-[calc(100dvh-220px)]">
            {/* Replace this with your <Canvas> */}
            {/* <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                    <div className="text-lg font-semibold">Ohh snap!</div>
                    <div className="text-sm text-slate-500">
                        3D viewer unavailable
                    </div>
                </div>
            </div> */}
            <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight color="white" position={[0, 0, 5]} />
                <mesh>
                    <boxGeometry args={[configuration.mainProduct().dimensions.length, configuration.mainProduct().dimensions.height, configuration.mainProduct().dimensions.width]} />
                    <meshStandardMaterial color="gold" />
                </mesh>
            </Canvas>

            <div className="absolute left-4 top-4 flex items-center gap-2">
                <button className="border border-slate-200 bg-white px-3 py-2 text-xs hover:bg-slate-50">
                    Reset view
                </button>
                <button className="border border-slate-200 bg-white px-3 py-2 text-xs hover:bg-slate-50">
                    Screenshot
                </button>
            </div>
        </section >
    );
});

export default Viewer3D;