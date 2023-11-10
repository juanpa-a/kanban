import { create } from "zustand";

type State = {
    isRunning: boolean;
};

type Actions = {
    toggle: () => void;
};

export const useCelebration = create<State & Actions>((set) => ({
    isRunning: false,
    toggle: () => set((state: State) => ({ isRunning: !state.isRunning })),
}));
