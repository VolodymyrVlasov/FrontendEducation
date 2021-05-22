import {Color} from "../types/Color.js";

export class FilterComponent {
    rootCnt: HTMLDivElement
    filterBtn: HTMLButtonElement
    isFilterVisible: boolean = false

    constructor(rootCntId: string, filterBtnId: string) {
        this.rootCnt = <HTMLDivElement>document.getElementById(rootCntId)
        this.filterBtn = <HTMLButtonElement>document.getElementById(filterBtnId)
        this.filterBtn.addEventListener('click', () => this.showFilter())
    }

    private filterItemOnChange() {

    }

    private renderPriceFilter(): HTMLDivElement {
        let filterCnt = <HTMLDivElement>document.createElement('div')
        filterCnt.innerHTML = `
                             <div class="product_cnt_filter">
                        <div class="filter_card">

                            <div class="filter_card_header">
                                <span class="filter_card_header_title">Price</span>
                                <div id="filter_item_btn" class="filter_card_header_btn" onclick="collapseItemOnClick('filer_card_1')"></div>
                            </div>

                            <div id="filer_card_1" class="filter_card_content">
                                <div class="filter_input_item">
                                    <label class="filter_input_item_title" for="price_from">From</label>
                                    <input class="filter_input_item_input" id="price_from" type="text" placeholder="350">
                                </div>
                                <div class="filter_input_item">
                                    <label class="filter_input_item_title" for="price_to">To</label>
                                    <input class="filter_input_item_input" id="price_to" type="text" placeholder="1350">
                                </div>
                            </div>

                        </div>
                    </div>
            `
        return filterCnt
    }

    private renderItemCheckbox(obj: Object, id: string): HTMLDivElement {
        let innerItems: HTMLLIElement[] = Object.keys(obj).map((value, index) => {
            let temp = <HTMLLIElement>document.createElement('li')
            temp.innerHTML =
                ` <div>
                     <input type="checkbox" id="${value}">
                     <label for="${value}">${obj[value as keyof typeof obj]}</label>
                 </div>`
            return temp
        })

        let temp: HTMLDivElement = document.createElement('div')
        temp.id = id

        innerItems.forEach((value)=>{
            temp.appendChild(value)
        })

        return temp
    }


    private showFilter(): void {
        if (!this.isFilterVisible) {
            let filtersCnt = <HTMLDivElement>document.createElement('div')
            filtersCnt.append(this.renderPriceFilter())
            filtersCnt.append(this.renderItemCheckbox(Color, "f"))
            filtersCnt.addEventListener('input', (event)=> {
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
        // @ts-ignore
        console.log(event.target.value)
    }
}
