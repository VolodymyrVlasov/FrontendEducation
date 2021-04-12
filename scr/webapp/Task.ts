import {Lang, TASKS} from "./Enums.js";

export interface Task {
    title: string
    description: string
    id: TASKS
    language: Lang
}