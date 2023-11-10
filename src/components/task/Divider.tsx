import { Box } from "@radix-ui/themes";
import { useProject } from "../../stores/Project";
import { useCelebration } from "../../stores/Celebration";

type Props = {
    columnPosition: number;
    dividerPosition: number;
};

export const Divider = ({ columnPosition, dividerPosition }: Props) => {
    const project = useProject((state) => state);
    const celebration = useCelebration((state) => state);

    const grow = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.height = "120px"; // Move down by 5 pixels
        e.currentTarget.style.transition = "height 0.3s ease";
    };

    const shrink = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.height = "15px";
        e.currentTarget.style.transition = "height 0.3s ease";
    };

    return (
        <Box
            onDragOver={(e) => {
                e.preventDefault();

                grow(e);
            }}
            onDragLeave={(e) => {
                shrink(e);
            }}
            onDragEnd={(e) => {
                e.currentTarget.style.height = "15px";
                shrink(e);
            }}
            onDrop={(e) => {
                shrink(e);

                const task = JSON.parse(e.dataTransfer.getData("task"));
                const stage = e.dataTransfer.getData("stage");
                const position = e.dataTransfer.getData("position");

                project.task.remove(parseInt(stage), parseInt(position));
                project.task.insertAt(columnPosition, dividerPosition, task);

                // toggle celebration when task is moved to done, or
                // to a custom final stage
                if (columnPosition === project.columns.length - 1) {
                    celebration.toggle();

                    setTimeout(() => {
                        celebration.toggle();
                    }, 12_000);
                }
            }}
            style={{
                height: "15px",
                width: "100%",
            }}
        />
    );
};
