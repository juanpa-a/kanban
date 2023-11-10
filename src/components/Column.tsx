import { Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { Task } from "./Task";
import {
    DragHandleDots2Icon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { TaskDialog } from "./TaskDialog";
import { useProject } from "../stores/Project";
import { Divider } from "./Divider";
import { ColumnDivider } from "./ColumnDivider";

type Props = {
    id: number;
    name: string;
    position: number;
};

export const Column = ({ id, name, position }: Props) => {
    const project = useProject((state) => state);
    const tasks = project.columns[position].tasks;

    return (
        <>
            <ColumnDivider position={position} />
            <Card
                key={id}
                variant="ghost"
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData("columnPosition", String(position));
                }}
                style={{ width: "420px" }}
            >
                <Flex py="3" px="3" direction="column">
                    <Flex width="100%" justify="between" align="center">
                        <Text weight="medium">{name}</Text>
                        <Flex gap="3" align="center">
                            <IconButton
                                variant="ghost"
                                color="ruby"
                                onClick={() => {
                                    project.stateColumns.remove(position);
                                }}
                            >
                                <TrashIcon width="15" height="15" />
                            </IconButton>

                            <DragHandleDots2Icon />
                        </Flex>
                    </Flex>
                    {tasks.map(({ id, name, description }, index) => (
                        <Task
                            key={id}
                            id={id}
                            name={name}
                            description={description}
                            deadline={Date.now()}
                            stage={position}
                            position={index}
                        />
                    ))}
                    <Divider
                        columnPosition={position}
                        dividerPosition={tasks.length}
                    />

                    <TaskDialog stage={position} />
                </Flex>
            </Card>
        </>
    );
};
