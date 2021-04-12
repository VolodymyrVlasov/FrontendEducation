export class ArrayOffset {
    arr: any[] = ['1', '2', '3', '4', '5', 6, '7', 8, '9', '10']    // arr = [8, 9, 10, 1, 2 , 3, 4, 5, 6, 7]
    offset: number = 3

    moveArray() {
        console.log('array before move ' + this.arr)

        for (let i = 0; i < this.offset; i++) {
            for (let j = this.arr.length - 1; j > 0; j--) {
                this.arr[j] = this.arr[j - 1]
            }

            this.arr[0] = this.arr[this.arr.length - 1]
            this.arr.splice(this.arr.length - 1, 1);
        }

        console.log('array after move ' + this.arr)
    }
}




