// import {ITask} from "./webapp/Task.js";
import { Lang, TaskType } from "./webapp/Enums.js";
import { ArrayOffset } from "./tasks/task_2/ArrayOffset.js";
import { TestBlockChain } from "./tasks/task_1/Block.js";
let tsCnt = document.getElementById('ts_root');
let jsCnt = document.getElementById('js_root');
export const taskList = new Map();
new ArrayOffset(TaskType.ARRAY_MOVER);
new TestBlockChain(TaskType.BLOCKCHAIN);
class TaskManager {
    // create cards with tasks
    static renderCards() {
        taskList.forEach((value, key) => {
            this.renderCardItem(value);
        });
    }
    static renderCardItem(task) {
        let card = document.createElement('div');
        card.innerHTML = `
                 <div class="task_card">
                        <div class="${task.language == Lang.TS ? 'ts_logo' : 'js_logo'}">
                            <span class="logo_text">${task.language}</span>
                        </div>
                        <div class="task_info">
                            <p class="title_text">${task.title}</p>
                            <div class="description">
                                <p class="simple_text">${task.description}</p>
                            </div>
                            <button class="button" name="task_btn" id="${task.type}">View</button>
                        </div>
                    </div>
                `;
        if (task.language == Lang.TS) {
            tsCnt === null || tsCnt === void 0 ? void 0 : tsCnt.appendChild(card);
        }
        else if (task.language == Lang.JS) {
            jsCnt === null || jsCnt === void 0 ? void 0 : jsCnt.appendChild(card);
        }
    }
}
TaskManager.renderCards();
document.getElementsByName('task_btn').forEach((e) => {
    e.addEventListener('click', () => startTask(e.id));
});
const startTask = (taskId) => {
    for (let tasksKey in TaskType) {
        if (tasksKey == taskId) {
            console.log(tasksKey);
            // start this task
            // taskList.get()
        }
    }
};
