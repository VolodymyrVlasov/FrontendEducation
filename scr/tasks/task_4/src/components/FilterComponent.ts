import {Color, Memory, Os} from "../types/index.js";
import {FilterItem, IFilterItem} from "./FilterItem.js";

export class FilterComponent {
    rootCnt: HTMLDivElement
    filterBtn: HTMLButtonElement
    isFilterVisible: boolean = false
    private filterData: Map<Object, IFilterItem>
    private filterPriceCard: FilterItem
    private filterValues: Map<String, Array<any>>
    private filterColors: Array<string>
    private filterOs: Array<string>
    private filterMemory: Array<string>
    private filterPrice: Array<number>



    constructor(rootCntId: string, filterBtnId: string) {
        this.filterValues = new Map<String, any>()
        this.filterColors = new Array<string>()
        this.filterMemory = new Array<string>()
        this.filterOs = new Array<string>()
        this.filterPrice = new Array<number>()
        this.filterData = new Map()
        this.addFilterData(Color, 'Color')
        this.addFilterData(Os, 'Os')
        this.addFilterData(Memory, 'Memory')

        this.filterPriceCard = new FilterItem(null, "Title")

        this.rootCnt = <HTMLDivElement>document.getElementById(rootCntId)
        this.filterBtn = <HTMLButtonElement>document.getElementById(filterBtnId)
        this.filterBtn.addEventListener('click', () => this.showFilter())
    }

    private addFilterData(o: Object, title: string) {
        this.filterData.set(o, new FilterItem(o, title))
    }

    private filterItemOnChange() {

    }

    private showFilter(): void {
        if (!this.isFilterVisible) {
            let filtersCnt = <HTMLDivElement>document.createElement('div')
            filtersCnt.append(this.filterPriceCard.renderPriceFilter())
            this.filterData.forEach((e) => {
                filtersCnt.append(e.render())
            })

            filtersCnt.addEventListener('input', (event) => {
                this.filter(event)
            })
            this.rootCnt.insertAdjacentElement('afterbegin', filtersCnt)
            if (this.rootCnt.firstElementChild) {
                this.rootCnt.firstElementChild.className = "product_cnt_filter_cnt";
            }
            this.isFilterVisible = true
        } else {
            if (this.rootCnt.firstChild) {
                this.rootCnt.removeChild(this.rootCnt.firstChild)
            }
            this.isFilterVisible = false
        }
    }

    private filter(event: Event) {
        if (event.target instanceof HTMLInputElement && event.target.type == 'checkbox') {
            if (event.target.parentNode?.parentNode?.parentNode?.id == 'color') {
                this.filterColors.push(Color[event.target.id as keyof typeof Color])
                this.filterValues.set('color', this.filterColors)
            } else if (event.target.parentNode?.parentNode?.parentNode?.id == 'os'){
                this.filterOs.push(Os[event.target.id as keyof typeof Os])
                this.filterValues.set('os', this.filterColors)
            }
            else if (event.target.parentNode?.parentNode?.parentNode?.id == 'memory'){
                this.filterMemory.push(Memory[event.target.id as keyof typeof Memory])
                this.filterValues.set('storage', this.filterMemory)
            }

        } else if (event.target instanceof HTMLInputElement && event.target.type == 'text') {
            if (event.target.id === 'price_from') {
                this.filterPrice[0] = Number(event.target.value)
            } else if (event.target.id === 'price_to') {
                this.filterPrice[1] = Number(event.target.value)
            }
            this.filterValues.set('price', this.filterPrice)
        }
        console.log(this.filterValues)
    }
}
