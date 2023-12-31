import { Pencil1Icon } from "@radix-ui/react-icons";
import {
    Button,
    Dialog,
    Flex,
    IconButton,
    Text,
    TextField,
} from "@radix-ui/themes";
import { useProject } from "../../stores/Project";
import { useState } from "react";

type Props = {
    stage: number;
    position: number;
    name: string;
    description: string;
};

export const EditDialog = ({
    stage,
    position,
    name: currName,
    description: currDescription,
}: Props) => {
    const project = useProject((state) => state);

    const [name, setName] = useState(currName);
    const [description, setDescription] = useState(currDescription);

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <IconButton size="1" variant="ghost" color="mint">
                    <Pencil1Icon width="18" height="18" />
                </IconButton>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Edit task</Dialog.Title>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Name
                        </Text>
                        <TextField.Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Walk the dog"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextField.Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="45 min walk around the park"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button
                            onClick={() => {
                                project.task.update(
                                    stage,
                                    position,
                                    name,
                                    description
                                );
                            }}
                        >
                            Save
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
