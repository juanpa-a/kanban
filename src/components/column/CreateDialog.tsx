import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useProject } from "../../stores/Project";
import { useState } from "react";

export const CreateDialog = () => {
    const project = useProject((state) => state);

    const [name, setName] = useState("");

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button mt="4" variant="solid" color="iris">
                    Add column
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
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button
                            color="iris"
                            onClick={() => {
                                if (name) {
                                    project.stateColumns.add({
                                        id: Math.random() * 12345,
                                        name,
                                        position: project.columns.length,
                                        tasks: [],
                                    });
                                }
                                setName("");
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
