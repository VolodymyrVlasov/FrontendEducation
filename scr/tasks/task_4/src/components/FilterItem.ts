export interface IFilterItem {
    render(): HTMLElement
}

export class FilterItem implements IFilterItem {
    private readonly obj: Object | null
    private readonly filterTitle: string
    private filterValues: Array<any>
    private headerFilter: HTMLDivElement

    constructor(object: Object | null, filterTitle: string) {
        this.obj = object
        this.filterTitle = filterTitle
        this.filterValues = new Array<any>()
        this.headerFilter = document.createElement('div')
    }

    public renderPriceFilter(): HTMLElement {
        let filterCard = <HTMLElement>document.createElement('div')
        filterCard.className = 'filter_card'
        filterCard.append(this.addHeader())

        let filterContent = document.createElement('div')
        filterContent.className = 'filter_card_content'
        filterContent.id = 'filer_card_1'
        filterContent.innerHTML = `
                <div class="filter_input_item">
                    <label class="filter_input_item_title" for="price_from">From</label>
                    <input class="filter_input_item_input" id="price_from" type="text" placeholder="350">
                </div>
                <div class="filter_input_item">
                    <label class="filter_input_item_title" for="price_to">To</label>
                    <input class="filter_input_item_input" id="price_to" type="text" placeholder="1350">
                </div>
            `

        filterCard.getElementsByClassName('filter_card_header_btn')[0]
            .addEventListener('click', (e) => {
                this.collapseFilter(filterContent.id)
            })
        filterCard.append(filterContent)
        return filterCard
    }

    public render(): HTMLElement {
        if (this.obj == null)
            throw new Error("filter object is null")
        let o: Object = this.obj
        let rawHTML: HTMLDivElement = document.createElement('div')
        rawHTML.className = 'filter_card'
        rawHTML.append(this.addHeader())

        let innerItems: HTMLLIElement[] = Object.keys(o).map((value) => {
            let rawLi = <HTMLLIElement>document.createElement('li')
            rawLi.innerHTML = ` <div>
                                 <input class="filter_input_item_inut" type="checkbox" id="${value}">
                                 <label class="filter_input_item_title" for="${value}">${o[value as keyof typeof o]}</label>
                               </div>`
            rawLi.className = 'filter_input_item'
            return rawLi
        })
        let filterContent = <HTMLDivElement>document.createElement('div')
        filterContent.id = this.filterTitle.toLocaleLowerCase()
        innerItems.forEach((value: HTMLLIElement) => filterContent.appendChild(value))
        rawHTML.append(filterContent)
        rawHTML.getElementsByClassName('filter_card_header_btn')[0]
            .addEventListener('click', (e) => {
                this.collapseFilter(filterContent.id)
            })
        return rawHTML
    }

    private addHeader(): HTMLDivElement {
        this.headerFilter.innerHTML =
            `<div class="filter_card_header">
                <span class="filter_card_header_title">${this.filterTitle}</span>
                <div id="filter_item_btn" class="filter_card_header_btn"></div>
            </div>`
        return this.headerFilter
    }

    private collapseFilter(collapseElementId: string): void {
        let filterContent = <HTMLDivElement>document.getElementById(collapseElementId)
        let visibility = filterContent.style.display
        filterContent.style.display = visibility !== 'none' ? 'none' : "block"
    }
}