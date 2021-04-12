import { Lang, TASKS } from "./webapp/Enums.js";
var tsCnt = document.getElementById('ts_root');
var jsCnt = document.getElementById('js_root');
var tasks = [
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
];
var TaskManager = /** @class */ (function () {
    function TaskManager() {
    }
    // create cards with tasks
    TaskManager.renderCards = function () {
        tasks.forEach(function (e) {
            var card = document.createElement('div');
            card.innerHTML = "\n                 <div class=\"task_card\">\n                        <div class=\"" + (e.language == Lang.TS ? 'ts_logo' : 'js_logo') + "\">\n                            <span class=\"logo_text\">" + e.language + "</span>\n                        </div>\n                        <div class=\"task_info\">\n                            <p class=\"title_text\">" + e.title + "</p>\n                            <div class=\"description\">\n                                <p class=\"simple_text\">" + e.description + "</p>\n                            </div>\n                            <button class=\"button\" name=\"task_btn\" id=\"" + e.id + "\">View</button>\n                        </div>\n                    </div>\n                ";
            if (e.language == Lang.TS) {
                tsCnt === null || tsCnt === void 0 ? void 0 : tsCnt.appendChild(card);
            }
            else if (e.language == Lang.JS) {
                jsCnt === null || jsCnt === void 0 ? void 0 : jsCnt.appendChild(card);
            }
        });
    };
    return TaskManager;
}());
TaskManager.renderCards();
document.getElementsByName('task_btn').forEach(function (e) {
    e.addEventListener('click', function () { return startTask(e.id); });
});
var startTask = function (taskId) {
    for (var tasksKey in TASKS) {
        if (tasksKey == taskId) {
            console.log(tasksKey);
            // start this task
        }
    }
};
//add event listener for all buttons 'View', and when it will be clicked call class
