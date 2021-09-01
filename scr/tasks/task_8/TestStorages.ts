import {AbstractTask} from "../../webapp/AbstractTask.js";
import {Lang, TaskType} from "../../webapp/Enums.js";

export class TestStorages extends AbstractTask{
    description: string = 'Working with storages'
    githubLink: string =  'https://github.com/VolodymyrVlasov/FrontendEducation/tree/main/scr/tasks/task_8'
    htmlPart: boolean = false;
    language: Lang = Lang.TS
    title: string = "Storages"
    type: TaskType = TaskType.STORAGES

    renderContainer(htmlPart: boolean, contentCnt: string | undefined): void {
        window.open('../scr/tasks/task_8/src/index.html')
    }
}