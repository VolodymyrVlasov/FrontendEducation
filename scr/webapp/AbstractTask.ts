import {Lang, TaskType} from "./Enums.js";
import {taskList} from "../index.js";

export abstract class AbstractTask {
    abstract description: string
    abstract language: Lang
    abstract title: string
    abstract type: TaskType
    abstract htmlPart: boolean
    abstract githubLink: string
    abstract renderContainer(htmlPart: boolean, contentCnt: string | undefined): void

    constructor(type: TaskType) {
        taskList.set(type, this)
    }

}
