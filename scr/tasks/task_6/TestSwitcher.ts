import {AbstractTask} from "../../webapp/AbstractTask.js";
import {Lang, TaskType} from "../../webapp/Enums.js";
import {Switcher} from "./src/Switcher.js";

export class TestSwitcher extends AbstractTask{
    description: string = 'script that work with few Api\'s on single page'
    githubLink: string = 'https://github.com/VolodymyrVlasov/FrontendEducation/tree/main/scr/tasks/task_6'
    htmlPart: boolean = true
    language: Lang = Lang.TS
    title: string = 'Api switcher'
    type: TaskType = TaskType.SWITCHER

    renderContainer(htmlPart: boolean): void {
        new Switcher()
    }
}