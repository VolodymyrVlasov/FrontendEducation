import {TestUnsplash} from "../../task_3/TestUnsplash.js";
import {TestPexels} from "../../task_5/TestPexels.js";
import {TaskType} from "../../../webapp/Enums.js";
import {AbstractTask} from "../../../webapp/AbstractTask.js";

export class Switcher {
    // todo: declare DOM fields
    rootCnt: HTMLElement
    videoBtn: HTMLButtonElement
    imagesBtn: HTMLButtonElement
    contentCnt: HTMLElement

    constructor() {
        // todo: initialize fields
        this.rootCnt = <HTMLDivElement>document.getElementById('root_cnt')
        this.videoBtn = document.createElement('button')
        this.imagesBtn = document.createElement('button')
        this.contentCnt = document.createElement('div')
        this.render()
    }

    private changeContent(task: AbstractTask): void {
        // todo: create instance of Api task and call render function with container parameter
        task.renderContainer(true, this.contentCnt.id)
    }

    private render(): void {
        this.imagesBtn.className = "button_selected"
        this.imagesBtn.innerHTML = 'Images'
        this.videoBtn.className = "button_switch"
        this.videoBtn.innerHTML = 'Videos'
        this.contentCnt.id = "contentCnt"
        let buttonCnt: HTMLElement = document.createElement('div')
        buttonCnt.className = "row center"

        buttonCnt.appendChild(this.imagesBtn)
        buttonCnt.appendChild(this.videoBtn)
        this.rootCnt.innerHTML = ''
        this.rootCnt.appendChild(buttonCnt)
        this.rootCnt.appendChild(this.contentCnt)

        new TestUnsplash(TaskType.UNSPLASH).renderContainer(true, this.contentCnt.id)

        this.videoBtn.addEventListener('click', () => {
            this.videoBtn.className = "button_selected"
            this.imagesBtn.className = "button_switch"
            this.changeContent(new TestPexels(TaskType.PEXELS))
        })

        this.imagesBtn.addEventListener('click', () => {
            this.videoBtn.className = "button_switch"
            this.imagesBtn.className = "button_selected"
            this.changeContent(new TestUnsplash(TaskType.UNSPLASH))
        })
    }
}