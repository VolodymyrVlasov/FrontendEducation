import { taskList } from "../index.js";
export class AbstractTask {
    constructor(type) {
        taskList.set(type, this);
    }
}
