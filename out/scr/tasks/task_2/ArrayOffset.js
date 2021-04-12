import { Lang, TaskType } from "../../webapp/Enums.js";
import { AbstractTask } from "../../webapp/AbstractTask.js";
export class ArrayOffset extends AbstractTask {
    constructor() {
        super(...arguments);
        this.description = "";
        this.title = "";
        this.language = Lang.TS;
        this.type = TaskType.ARRAY_MOVER;
    }
    static moveArray() {
        let arr = ['1', '2', '3', '4', '5', 6, '7', 8, '9', '10']; // arr = [8, 9, 10, 1, 2 , 3, 4, 5, 6, 7]
        let offset = 3;
        console.log('array before move ' + arr);
        for (let i = 0; i < offset; i++) {
            for (let j = arr.length - 1; j > 0; j--) {
                arr[j] = arr[j - 1];
            }
            arr[0] = arr[arr.length - 1];
            arr.splice(arr.length - 1, 1);
        }
        console.log('array after move ' + arr);
    }
    renderContainer() {
        console.log('Test array offset');
        ArrayOffset.moveArray();
    }
}
