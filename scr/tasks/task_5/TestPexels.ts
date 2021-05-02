import {AbstractTask} from "../../webapp/AbstractTask.js";
import {Lang, TaskType} from "../../webapp/Enums.js";
import {VideoContainer} from "./src/VideoContainer.js";

export class TestPexels extends AbstractTask{
    description: string = 'Script that provide work with Pexels API'
    githubLink: string = 'https://github.com/VolodymyrVlasov/FrontendEducation/tree/main/scr/tasks/task_5'
    htmlPart: boolean = true
    language: Lang= Lang.TS
    title: string = "Pexels API"
    type: TaskType= TaskType.PEXELS

    renderContainer(htmlPart: boolean): void {
       new VideoContainer().run(this.htmlPart, this.githubLink)
    }
}