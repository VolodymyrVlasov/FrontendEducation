import {Lang, TaskType} from "./webapp/Enums.js";
import {ArrayOffset} from "./tasks/task_2/ArrayOffset.js";
import {TestBlockChain} from "./tasks/task_1/Block.js";
import {AbstractTask} from "./webapp/AbstractTask.js";
import { TestUnsplash } from "./tasks/task_3/TestUnsplash.js";

let tsCnt: HTMLElement | null = document.getElementById('ts_root')
let jsCnt: HTMLElement | null = document.getElementById('js_root')

export const taskList = new Map<Number, AbstractTask>()
new ArrayOffset(TaskType.ARRAY_MOVER)
new TestBlockChain(TaskType.BLOCKCHAIN)
new TestUnsplash(TaskType.UNSPLASH)

class TaskManager {
    static renderCards() {
        taskList.forEach((value: AbstractTask, key: Number) => {
            this.renderCardItem(value)
        })
    }

    static renderCardItem(task: AbstractTask) {
        let taskCard = document.createElement('div')
        taskCard.className = 'task_card'

        let languageLogo = document.createElement('div')
        languageLogo.className = task.language == Lang.TS ? 'ts_logo' : 'js_logo'

        let languageName = document.createElement('span')
        languageName.innerHTML = task.language
        languageName.className = 'logo_text'

        languageLogo.appendChild(languageName)

        let taskInfo = document.createElement('div')
        taskInfo.className = 'task_info'

        let taskTitle = document.createElement('p')
        taskTitle.innerHTML = task.title
        taskTitle.className = 'title_text'

        let taskDescription = document.createElement('p')
        taskDescription.innerHTML = task.description
        taskDescription.className = 'description simple_text'

        let taskButton = document.createElement('button')
        taskButton.name = 'task_btn'
        taskButton.id = task.type.toString()
        taskButton.innerHTML = 'Test me'
        taskButton.className = 'button'


        taskInfo.appendChild(taskTitle)
        taskInfo.appendChild(taskDescription)
        taskInfo.appendChild(taskButton)

        taskCard.appendChild(languageLogo)
        taskCard.appendChild(taskInfo)

//      let card = document.createElement('div')
//         card.innerHTML = `
//                  <div class="task_card">
//                         <div class="${task.language == Lang.TS ? 'ts_logo' : 'js_logo'}">
//                             <span class="logo_text">${task.language}</span>
//                         </div>
//                         <div class="task_info">
//                             <p class="title_text">${task.title}</p>
//                             <p class="description simple_text">${task.description}</p>
//                             <button class="button" name="task_btn" id="${task.type}">View</button>
//                         </div>
//                     </div>
//                 `
        if (task.language == Lang.TS) {
            tsCnt?.appendChild(taskCard)
        } else if (task.language == Lang.JS) {
            jsCnt?.appendChild(taskCard)
        }
    }
}

TaskManager.renderCards()

document.getElementsByName('task_btn').forEach((e) => {
    e.addEventListener('click', () => taskList.get(Number(e.id))?.renderContainer())
})


