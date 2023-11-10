import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import { Kanban } from "./pages/Kanban";

export default function App() {
    return (
        <Theme>
            <Kanban />
        </Theme>
    );
}
