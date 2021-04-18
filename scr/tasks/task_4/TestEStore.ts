import { AbstractTask } from "../../webapp/AbstractTask.js";
import { Lang, TaskType } from "../../webapp/Enums.js";

export class TestEStore extends AbstractTask {
    
    title: string = 'eStore'
    description: string = 'using SASS'
    language: Lang = Lang.TS
    type: TaskType = TaskType.ESTORE
    htmlPart: boolean = true
    githubLink: string = 'https://github.com/VolodymyrVlasov/FrontendEducation/tree/main/scr/tasks/task_4'
    renderContainer(htmlPart: boolean): void {
        throw new Error("Method not implemented.");
    }
    
}