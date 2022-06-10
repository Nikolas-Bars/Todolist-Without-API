import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistId: string
}

type ChangeStatusActionType = {
    type: 'CHANGE-STATUS'
    taskID: string,
    isDone: boolean,
    todolistId: string
}

type AddTaskTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type changeTaskTitleActionType = {
    type: 'CHANGE-TITLE'
    taskID: string,
    todolistId: string,
    title: string
}

type ActionType = RemoveTaskActionType | AddTaskTaskActionType | ChangeStatusActionType | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType



// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskID)
                };
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            };
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {...el, isDone: action.isDone} : el)
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskID ? {...el, title: action.title} : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.tdID]: []
        }
        case "REMOVE-TODOLIST":
           let stateCopy = {...state}
            delete stateCopy[action.id]

            return stateCopy




        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskID, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
    return { type: 'CHANGE-STATUS', taskID, isDone, todolistId}
}

export const changeTaskTitleAC = (taskID: string, todolistId: string, title: string): changeTaskTitleActionType => {
    return { type: 'CHANGE-TITLE', taskID, todolistId, title}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


