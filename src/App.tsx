import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import { Kanban } from "./pages/Kanban";

export default function App() {
    return (
        <Theme
            accentColor="iris"
            grayColor="gray"
            panelBackground="solid"
            scaling="100%"
            radius="full"
        >
            <Kanban />
        </Theme>
    );
}
