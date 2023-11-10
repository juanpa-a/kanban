import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
    id: number;
    name: string;
    description: string | null;
    deadline: number | null;
};

type TaskState = {
    id: number;
    name: string;
    position: number;
    tasks: Task[];
};

type State = {
    name: string;
    columns: TaskState[];
};

type Actions = {
    task: {
        add: (columnPosition: number, task: Task) => void;
        insertAt: (
            columnPosition: number,
            taskPosition: number,
            task: Task
        ) => void;
        remove: (columnPosition: number, taskPosition: number) => void;
        update: (
            columnPosition: number,
            taskPosition: number,
            name: string,
            description: string
        ) => void;
    };
    stateColumns: {
        add: (column: TaskState) => void;
        remove: (columnPosition: number) => void;
        moveTo: (columnPosition: number, columnDestination: number) => void;
    };
};

export const useProject = create<State & Actions>(
    persist(
        (set) => ({
            name: "Just kanban",
            columns: [
                {
                    id: 1,
                    name: "To do",
                    position: 0,
                    tasks: [],
                },
                {
                    id: 2,
                    name: "In progress",
                    position: 1,
                    tasks: [],
                },
                {
                    id: 3,
                    name: "Done",
                    position: 2,
                    tasks: [],
                },
            ] as TaskState[],

            task: {
                add: (columnPosition: number, task: Task) =>
                    set((state) => {
                        const updated = { ...state };
                        updated.columns[columnPosition].tasks.push(task);
                        return updated;
                    }),
                insertAt: (
                    columnPosition: number,
                    taskPosition: number,
                    task: Task
                ) =>
                    set((state) => {
                        const updated = { ...state };
                        updated.columns[columnPosition].tasks.splice(
                            taskPosition,
                            0,
                            task
                        );
                        return updated;
                    }),
                remove: (columnPosition: number, taskPosition: number) =>
                    set((state) => {
                        const updated = { ...state };
                        updated.columns[columnPosition].tasks.splice(
                            taskPosition,
                            1
                        );
                        return updated;
                    }),
                update: (
                    columnPosition: number,
                    taskPosition: number,
                    name: string,
                    description: string
                ) =>
                    set((state) => {
                        const updated = { ...state };
                        const task =
                            updated.columns[columnPosition].tasks[taskPosition];
                        task.name = name;
                        task.description = description;
                        return updated;
                    }),
            },

            stateColumns: {
                add: (taskState: TaskState) =>
                    set((state) => {
                        const updated = { ...state };
                        updated.columns.push(taskState);
                        return updated;
                    }),
                moveTo: (columnPosition: number, columnDestination: number) =>
                    set((state) => {
                        const updated = { ...state };
                        const [column] = updated.columns.splice(
                            columnPosition,
                            1
                        );
                        updated.columns.splice(columnDestination, 0, column);
                        return updated;
                    }),
                remove: (columnPosition: number) =>
                    set((state) => {
                        const updated = { ...state };
                        updated.columns.splice(columnPosition, 1);
                        return updated;
                    }),
            },
        }),
        {
            name: "just-kanban",
            skipHydration: false,
            partialize: (state) => {
                state;
                return {
                    name: state.name,
                    columns: state.columns,
                };
            },
        }
    ) as StateCreator<State & Actions>
);
