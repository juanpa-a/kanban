import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useProject } from "../stores/Project";
import { useState } from "react";

type Props = {
    stage: number;
};

export const TaskDialog = ({ stage }: Props) => {
    const project = useProject((state) => state);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button mt="4" variant="soft" color="iris">
                    Add task
                    <PlusCircledIcon width="18" height="18" />
                </Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Create a new task</Dialog.Title>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Name
                        </Text>
                        <TextField.Input
                            value={name}
                            color="iris"
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
                            color="iris"
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
                                if (name) {
                                    project.task.add(stage, {
                                        id: Math.random() * 10000,
                                        name,
                                        description,
                                        deadline: null,
                                    });
                                }
                                setName("");
                                setDescription("");
                            }}
                            color="iris"
                        >
                            Save
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
