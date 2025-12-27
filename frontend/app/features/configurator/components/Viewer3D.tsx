import { Canvas } from "@react-three/fiber";
import { observer } from "mobx-react";
import { useConfiguration } from "../provider/configurationProvider";
import { CameraControls, ContactShadows, Environment, Grid, Sky } from "@react-three/drei/native";
import { Select, useSelect, Edges } from "@react-three/drei";
import { useControls } from 'leva'
import { useState } from "react";

const Box = observer((props) => {
    const configuration = useConfiguration();
    const selected = useSelect(); // Array of THREE.Object3D
    const isSelected = selected.some((obj) => obj.name === props.id);

    return (
        <mesh name={props.id}>
            <boxGeometry args={[configuration.mainProduct().dimensions.length, configuration.mainProduct().dimensions.height, configuration.mainProduct().dimensions.width]} />
            <meshStandardMaterial color="gold" />
            <Edges visible={isSelected} scale={1.01} renderOrder={1000} color={"#0066ff"} lineWidth={3}>
                <meshBasicMaterial transparent depthTest={false} />
            </Edges>
        </mesh>
    );
})

const Viewer3D = observer(() => {
    const { gridSize, ...gridConfig } = useControls({
        gridSize: [10.5, 10.5],
        cellSize: { value: 0.2, min: 0, max: 10, step: 0.1 },
        cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
        cellColor: '#6f6f6f',
        sectionSize: { value: 2, min: 0, max: 10, step: 0.1 },
        sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
        sectionColor: '#767676',
        fadeDistance: { value: 19, min: 0, max: 100, step: 1 },
        fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
        followCamera: false,
        infiniteGrid: true
    })

    const configuration = useConfiguration();
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
                <pointLight position={[10, 10, 10]} />
                <Environment preset="city" />
                <ContactShadows frames={1} position={[0, -0.5, 0]} scale={10} opacity={0.4} far={1} blur={2} />
                <Sky />
                <Select box multiple onChange={(items) => console.log('Selected:', items)} filter={items => items}>
                    <Box id="main-product"></Box>
                </Select>

                <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
                <CameraControls />
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