import {Lang, TaskType} from "./webapp/Enums.js";
import {ArrayOffset} from "./tasks/task_2/ArrayOffset.js";
import {TestBlockChain} from "./tasks/task_1/Block.js";
import {AbstractTask} from "./webapp/AbstractTask.js";
import {TestUnsplash} from "./tasks/task_3/TestUnsplash.js";
import {TestEStore} from "./tasks/task_4/TestEStore.js";
import {TestPexels} from "./tasks/task_5/TestPexels.js";
import {TestSwitcher} from "./tasks/task_6/TestSwitcher.js";
import {TestCustomDOM} from "./tasks/task_7/TestCustomDOM.js";

let tsCnt: HTMLElement | null = document.getElementById('ts_root')
let jsCnt: HTMLElement | null = document.getElementById('js_root')

export const taskList = new Map<Number, AbstractTask>()
new ArrayOffset(TaskType.ARRAY_MOVER)
new TestBlockChain(TaskType.BLOCKCHAIN)
new TestUnsplash(TaskType.UNSPLASH)
new TestEStore(TaskType.ESTORE)
new TestPexels(TaskType.PEXELS)
new TestSwitcher(TaskType.SWITCHER)
new TestCustomDOM(TaskType.CUSTOM_DOM)

class TaskManager {
    static renderCards() {
        taskList.forEach((value: AbstractTask, key: Number) => {
            this.renderCardItem(value)
        })
    }

    static renderCardItem(task: AbstractTask) {
     let card = document.createElement('div')
        card.innerHTML = `
                 <div class="task_card">
                        <div class="${task.language == Lang.TS ? 'ts_logo' : 'js_logo'}">
                            <span class="logo_text">${task.language}</span>
                        </div>
                        <div class="task_info">
                            <p class="title_text">${task.title}</p>
                            <p class="description simple_text">${task.description}</p>
                            <button class="button" name="task_btn" id="${task.type}">View</button>
                        </div>
                    </div>`
        if (task.language == Lang.TS) {
            tsCnt?.appendChild(card)
        } else if (task.language == Lang.JS) {
            jsCnt?.appendChild(card)
        }
    }
}

TaskManager.renderCards()

document.getElementsByName('task_btn').forEach((e) => {
    e.addEventListener('click', () => {
        let task = taskList.get(Number(e.id))
        if (task != null) {
            task.renderContainer(task.htmlPart, undefined)
        }
    })
})


