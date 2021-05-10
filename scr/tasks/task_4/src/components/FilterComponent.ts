export class FilterComponent {
    rootCnt: HTMLDivElement
    filterBtn: HTMLButtonElement
    isFilterVisible: boolean = false

    constructor(rootCntId: string, filterBtnId: string) {
        this.rootCnt = <HTMLDivElement>document.getElementById(rootCntId)
        this.filterBtn = <HTMLButtonElement>document.getElementById(filterBtnId)
        this.filterBtn.addEventListener('click', () => this.showFilter())
    }

    private showFilter(): void {
        if (this.isFilterVisible == false) {
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
            this.rootCnt.insertAdjacentElement('afterbegin', filterCnt)
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
}
