import { observer, Provider } from "mobx-react";
import TopBar from "../components/TopBar";
import Viewer3D from "../components/Viewer3D";
import ConfigPanel from "../components/ConfigPanel";
import Footer from "../components/Footer";
import { ConfigStepOne, ConfigStepThree, ConfigStepTwo } from "../components/ConfigStep";
import { ConfigurationProvider } from "../provider/configurationProvider";
import ConfiguratorViewModel from "../viewModels/ConfiguratorViewModel";

const ConfiguratorView = observer(() => {
    const { hello, error, isLoading, configurationModel } = ConfiguratorViewModel();

    if (error) {
        return <>Ohh snap an error append : {error.message}</>;
    }

    if (isLoading) {
        return <>Loading ...</>;
    }

    return (
        <ConfigurationProvider model={configurationModel}>
            <TopBar />
            <main className="px-0">
                <div className="border-y border-slate-200">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
                        <Viewer3D />
                        <ConfigPanel>
                            <ConfigStepOne >
                            </ConfigStepOne>
                            <ConfigStepTwo  >
                                <h1>Step 2</h1>
                            </ConfigStepTwo>
                            <ConfigStepThree  >
                                <h1>Step 3</h1>
                            </ConfigStepThree>
                        </ConfigPanel>
                    </div>
                </div>
            </main>
            <Footer />
        </ConfigurationProvider>
    );

});
export default ConfiguratorView;