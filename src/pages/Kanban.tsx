import { Flex, Heading, ScrollArea } from "@radix-ui/themes";
import { Column } from "../components/column/Column";
import { useParams } from "react-router-dom";
import { Ref, useEffect, useRef } from "react";
import { useProject } from "../stores/Project";
import { CreateDialog } from "../components/column/CreateDialog";
import Confetti from "react-confetti";
import { useCelebration } from "../stores/Celebration";

type ScrollableElement = {
    scrollTo: (config: unknown) => void;
    scrollWidth: number;
};

export const Kanban = () => {
    const { id } = useParams();
    const scrollAreaRef = useRef<ScrollableElement>();
    const project = useProject((state) => state);
    const celebration = useCelebration((state) => state);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                left: scrollAreaRef.current.scrollWidth,
                behavior: "smooth",
            });
        }
    }, [project.columns.length]);

    return (
        <>
            <Flex p="2" gap="8" align="start" direction="column">
                <Flex justify="between" width="100%" align="center">
                    <Heading as="h1" weight="bold" key={id}>
                        {project.name}
                    </Heading>
                    <CreateDialog />
                </Flex>

                <ScrollArea
                    ref={scrollAreaRef as Ref<HTMLDivElement>}
                    size="1"
                    type="scroll"
                    scrollbars="horizontal"
                    style={{ maxWidth: "80vw" }}
                >
                    <Flex align="start" justify="center" width="100%">
                        {project.columns.map(({ id, name }, stage) => {
                            return (
                                <Column
                                    key={id}
                                    id={id}
                                    position={stage}
                                    name={name}
                                />
                            );
                        })}
                    </Flex>
                </ScrollArea>
            </Flex>
            {celebration.isRunning && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={250}
                    gravity={0.5}
                    recycle={false}
                />
            )}
        </>
    );
};
