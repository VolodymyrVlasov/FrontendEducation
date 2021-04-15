import {Lang, TaskType} from "../../webapp/Enums.js";
import {AbstractTask} from "../../webapp/AbstractTask.js";

export class ArrayOffset extends AbstractTask{
    title: string = "Array mover"
    description: string = "script that move array element for 3 step in right side"
    language: Lang = Lang.TS
    type: TaskType = TaskType.ARRAY_MOVER
    htmlPart: boolean = false;
    githubLink: string = ""

    renderContainer(htmlPart: boolean): void {
        console.log('Test array offset')
        ArrayOffset.moveArray()

        if (htmlPart) {
            let rootCnt = document?.getElementById('root_cnt')
            // @ts-ignore
            let gitLink: HTMLLinkElement | null = document.getElementById('git')

            if (gitLink != null) {
                gitLink.href = this.githubLink
            }
            if (rootCnt != null) {
                //append inner content here
            }
        } else {
            alert('Please, open colsole to view result')
        }
    }

    static  moveArray() {
        let arr: any[] = ['1', '2', '3', '4', '5', 6, '7', 8, '9', '10']    // arr = [8, 9, 10, 1, 2 , 3, 4, 5, 6, 7]
        let offset: number = 3

        console.log('array before move ' + arr)

        for (let i = 0; i < offset; i++) {
            for (let j = arr.length - 1; j > 0; j--) {
                arr[j] = arr[j - 1]
            }

            arr[0] = arr[arr.length - 1]
            arr.splice(arr.length - 1, 1);
        }

        console.log('array after move ' + arr)
    }
}






