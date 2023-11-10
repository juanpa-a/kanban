import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import { Kanban } from "./components/Kanban";

export default function App() {
    return (
        <Theme appearance="dark">
            <Kanban />
        </Theme>
    );
}
