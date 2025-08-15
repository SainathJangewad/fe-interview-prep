import { formConfig } from "./form/formConfig";
import ConfigForm from "./form/ConfigForm";

export default function DemoConfigForm() {
    return <ConfigForm config={formConfig} onSubmit={(v) => console.log(v)} />;
}
