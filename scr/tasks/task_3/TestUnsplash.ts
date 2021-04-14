import {AbstractTask} from "../../webapp/AbstractTask.js";
import {Lang, TaskType} from "../../webapp/Enums.js";
import {ImageContainer} from "./src/ImageContainer.js";

export class TestUnsplash extends AbstractTask {
    title: string = 'Unsplash API'
    description: string = 'Script that provide work with unsplash API'
    language: Lang = Lang.TS
    type: TaskType = TaskType.UNSPLASH
    htmlPart: boolean = false

    renderContainer(): void {
        console.log('Testing Unsplash API')
        TestUnsplash.run()
    }

    static run = () => {
        ImageContainer.render()
    }
}
