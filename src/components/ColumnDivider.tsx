import { Box } from "@radix-ui/themes";
import { useProject } from "../stores/Project";

type Props = {
    position: number;
};

export const ColumnDivider = ({ position }: Props) => {
    const project = useProject((state) => state);

    const shrink = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.width = "35px";
    };

    const grow = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.width = "250px";
        e.currentTarget.style.transition = "width 0.3s ease";
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
                shrink(e);
            }}
            onDrop={(e) => {
                shrink(e);
                const columnPosition = e.dataTransfer.getData("columnPosition");
                project.stateColumns.moveTo(parseInt(columnPosition), position);
            }}
            style={{
                width: "35px",
                height: "70vw",
            }}
        />
    );
};
