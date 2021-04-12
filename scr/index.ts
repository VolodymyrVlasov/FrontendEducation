import {Task} from "./webapp/Task.js";
import {Lang, TASKS} from "./webapp/Enums.js";

let tsCnt: HTMLElement | null = document.getElementById('ts_root')
let jsCnt: HTMLElement | null = document.getElementById('js_root')

const tasks: Task[] = [
    {
        id: TASKS.ARRAY_MOVER,
        language: Lang.TS,
        title: 'Array mover',
        description: 'move elements in array at 3 position',

    },
    {
        id: TASKS.BLOCKCHAIN,
        language: Lang.TS,
        title: 'Blockchain system',
        description: 'script that will define a simple blockchain structure',

    },
]

class TaskManager {
    // create cards with tasks
    static renderCards() {

        tasks.forEach((e) => {
            let card = document.createElement('div')
            card.innerHTML = `
                 <div class="task_card">
                        <div class="${e.language == Lang.TS ? 'ts_logo' : 'js_logo'}">
                            <span class="logo_text">${e.language}</span>
                        </div>
                        <div class="task_info">
                            <p class="title_text">${e.title}</p>
                            <div class="description">
                                <p class="simple_text">${e.description}</p>
                            </div>
                            <button class="button" name="task_btn" id="${e.id}">View</button>
                        </div>
                    </div>
                `
            if (e.language == Lang.TS) {
                tsCnt?.appendChild(card)
            } else if (e.language == Lang.JS) {
                jsCnt?.appendChild(card)


            }
        })
    }
}

TaskManager.renderCards()

document.getElementsByName('task_btn').forEach((e) => {
    e.addEventListener('click', () => startTask(e.id))
})

const startTask = (taskId: string) => {

    for (let tasksKey in TASKS) {
        if (tasksKey == taskId) {
            console.log(tasksKey)
            // start this task
        }
    }

}


//add event listener for all buttons 'View', and when it will be clicked call class