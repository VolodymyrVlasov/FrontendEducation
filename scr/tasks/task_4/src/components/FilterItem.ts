export interface IFilterItem {
    render(): HTMLElement
}

export class FilterItem implements IFilterItem {
    private readonly obj: Object
    private readonly filterTitle: string
    private filterValues: Array<any>

    constructor(object: Object, filterTitle: string) {
        this.obj = object
        this.filterTitle = filterTitle
        this.filterValues = new Array<any>()
    }

    public render(): HTMLElement {
        let o: Object = this.obj
        let rawHTML: HTMLDivElement = document.createElement('div')
        rawHTML.className = 'filter_card'
        rawHTML.innerHTML = `
                <div class="filter_card_header">
                    <span class="filter_card_header_title">${this.filterTitle}</span>
                    <div id="filter_item_btn" class="filter_card_header_btn"></div>
                </div>`

        let innerItems: HTMLLIElement[] = Object.keys(this.obj).map((value) => {
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

    private collapseFilter(collapseElementId: string): void {
        let filterContent = <HTMLDivElement>document.getElementById(collapseElementId)
        let visibility = filterContent.style.display
        filterContent.style.display = visibility !== 'none' ? 'none' : "block"
    }
}