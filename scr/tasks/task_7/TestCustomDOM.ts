import {AbstractTask} from "../../webapp/AbstractTask.js";
import {Lang, TaskType} from "../../webapp/Enums.js";

export class TestCustomDOM extends AbstractTask {
    description: string = 'Script & SCSS that customize input range element'
    githubLink: string = 'https://github.com/VolodymyrVlasov/FrontendEducation/tree/main/scr/tasks/task_7'
    htmlPart: boolean = true
    language: Lang = Lang.TS
    title: string = "Custom Input DOM"
    type: TaskType = TaskType.CUSTOM_DOM

    renderContainer(htmlPart: boolean, contentCnt: string | undefined): void {
        window.open("./scr/tasks/task_7/custom-input-range.html", '_blank')
    }
}