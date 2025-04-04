export  interface CounterState {
       count : number,
}

export  interface UserState{
    data : {name:string} | null,
    loading:boolean,
    error:string,
}

export interface RootState{
    counter:CounterState,
    user:UserState,
}

export  type CounterActionsTypes = 'INCREMENT' | 'DECREMENT' | 'RESET'