import {AbstractTask} from "../../webapp/AbstractTask.js";
import {Lang, TaskType} from "../../webapp/Enums.js";
import {PictureContainer} from "./src/PictureContainer.js";

export class TestUnsplash extends AbstractTask {
    title: string = 'Unsplash API'
    description: string = 'Script that provide work with unsplash API'
    language: Lang = Lang.TS
    type: TaskType = TaskType.UNSPLASH
    htmlPart: boolean = true
    githubLink: string = 'https://github.com/VolodymyrVlasov/FrontendEducation/tree/main/scr/tasks/task_3'

    renderContainer(htmlPart: boolean, contentCnt: string | undefined): void {
        PictureContainer.renderContainer(this.htmlPart, this.githubLink, contentCnt)
    }
}
