export class InputRangeComponent {
    input: HTMLInputElement
    label: HTMLDivElement

    constructor(inputId: string, labelId: string, thumbSize: number) {
        this.input = <HTMLInputElement>document.getElementById(inputId)
        this.label = <HTMLDivElement>document.getElementById(labelId)

        this.input.addEventListener('input', (e) => {
            let thumbHalfSize = Math.floor(thumbSize / 2)
            let value = Number(this.input.value)
            this.label.innerHTML = String(value)
            let from = Number(this.input.min)
            let to = Number(this.input.max)
            let labelCenterX = this.label.offsetWidth / 2
            let inputWidth = this.input.offsetWidth
            let gradientPosition = this.map(value, from, to, 0, 100)
            this.input.style.background = `linear-gradient(90deg, #FF7A00 ${gradientPosition}%, #DBDBDB ${gradientPosition}%)`

            let labelPosition = this.map(value, from, to, 0, inputWidth)
            labelPosition = (value >= to / 2) ?
                labelPosition - Math.abs(this.map(value, to / 2, to, labelCenterX, labelCenterX + thumbHalfSize))
                :
                labelPosition - Math.abs(this.map(value, from, to / 2, labelCenterX - thumbHalfSize, labelCenterX))

            this.label.style.left = `${labelPosition}px`
        })
    }

    public map(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}


new InputRangeComponent('input_range', 'input_label', 22)
