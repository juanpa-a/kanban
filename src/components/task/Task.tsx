import { Card, Box, Text, Flex, IconButton } from "@radix-ui/themes";
import { formatDate } from "../../helpers/formating";
import { Task as TaskType } from "../../stores/Project";
import { TrashIcon } from "@radix-ui/react-icons";
import { Divider } from "./Divider";
import { useProject } from "../../stores/Project";
import { EditDialog } from "./EditDialog";

type Props = {
    stage: number;
    position: number;
} & TaskType;

export const Task = ({
    id,
    name,
    description,
    deadline,
    stage,
    position,
}: Props) => {
    const formatedDate = formatDate(deadline || 0);
    const project = useProject((state) => state);
    return (
        <>
            <Divider columnPosition={stage} dividerPosition={position} />
            <Card
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData("stage", String(stage));
                    e.dataTransfer.setData("position", String(position));
                    e.dataTransfer.setData(
                        "task",
                        JSON.stringify({
                            id,
                            name,
                            description,
                            deadline,
                        })
                    );
                }}
                variant="classic"
            >
                <Flex gap="3" align="center" justify="between">
                    <Box>
                        <Text as="div" size="2" weight="bold">
                            {name}
                        </Text>
                        <Text as="div" size="2" color="gray">
                            {description}
                        </Text>
                    </Box>
                </Flex>

                <Flex width="100%" justify="between" align="center" pt="1">
                    <Text size="1" color="gray">
                        {formatedDate}
                    </Text>
                    <Flex gap="3">
                        <EditDialog
                            stage={stage}
                            position={position}
                            name={name}
                            description={description || ""}
                        />
                        <IconButton
                            size="1"
                            variant="ghost"
                            color="ruby"
                            onClick={() => {
                                project.task.remove(stage, position);
                            }}
                        >
                            <TrashIcon width="18" height="18" />
                        </IconButton>
                    </Flex>
                </Flex>
            </Card>
        </>
    );
};
