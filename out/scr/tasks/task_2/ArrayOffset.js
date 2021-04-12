var ArrayOffset = /** @class */ (function () {
    function ArrayOffset() {
        this.arr = ['1', '2', '3', '4', '5', 6, '7', 8, '9', '10']; // arr = [8, 9, 10, 1, 2 , 3, 4, 5, 6, 7]
        this.offset = 3;
    }
    ArrayOffset.prototype.moveArray = function () {
        console.log('array before move ' + this.arr);
        for (var i = 0; i < this.offset; i++) {
            for (var j = this.arr.length - 1; j > 0; j--) {
                this.arr[j] = this.arr[j - 1];
            }
            this.arr[0] = this.arr[this.arr.length - 1];
            this.arr.splice(this.arr.length - 1, 1);
        }
        console.log('array after move ' + this.arr);
    };
    return ArrayOffset;
}());
export { ArrayOffset };
