import { create } from 'zustand';

export interface ButtonType {
    name: string;
    onClick: Function;
}

interface State {
    show?: boolean;
    title?: string;
    body?: string;
    buttons?: ButtonType[],
}

interface StoreFunction {
    open: (state: State) => void;
    close: () => void;
}

const initState: State = {
    show: false,
    title: '',
    body: '',
    buttons: [
        // {name: '확인', onClick: ()=>{}},
        // {name: '취소', onClick: ()=>{}}
    ],
}

export const alertStore = create<State & StoreFunction>((set) => ({
    ...initState,
    open: (state: State) => set(() => ({ ...initState, ...state, show: true })),
    close: () => set(()=> ({ ...initState }))
}));