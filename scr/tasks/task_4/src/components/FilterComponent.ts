import {Color, Memory, Os} from "../types/index.js";
import {FilterItem, IFilterItem} from "./FilterItem.js";
import {HomeContainer} from "../containers/HomeContainer";
import {ProductItem} from "../models/ProductItem";
import Event = JQuery.Event;

export class FilterComponent {
    rootCnt: HTMLDivElement
    filterBtn: HTMLButtonElement
    isFilterVisible: boolean = false
    private filterData: Map<Object, IFilterItem>
    private filterPriceCard: FilterItem
    private filterValues: Map<String, Array<string | number>>
    private readonly filterColors: Array<string>
    private readonly filterOs: Array<string>
    private readonly filterMemory: Array<string>
    private filterPrice: Array<number>
    private homeContainer: HomeContainer
    private rangeFlag: boolean = false

    constructor(rootCntId: string, filterBtnId: string, homeContainer: HomeContainer) {
        this.homeContainer = homeContainer
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

    private addFilterData(propertyToFilter: Object, title: string) {
        this.filterData.set(propertyToFilter, new FilterItem(propertyToFilter, title))
    }

    private showFilter(): void {
        if (!this.isFilterVisible) {
            let filtersCnt = <HTMLDivElement>document.createElement('div')

            let filterByPriceCard = this.filterPriceCard.renderPriceFilter()
            filterByPriceCard.addEventListener("input", event => this.filterByPrice(event))
            filtersCnt.append(filterByPriceCard)

            this.filterData.forEach((e) => {
                let filterCard = e.render()
                filterCard.addEventListener('change', event => this.setFilterParam(event))
                filtersCnt.append(filterCard)
            })

            this.rootCnt.insertAdjacentElement('afterbegin', filtersCnt)
            if (this.rootCnt.firstElementChild) {
                this.rootCnt.firstElementChild.className = "product_cnt_filter_cnt";
            }
            this.isFilterVisible = true
            let btn = <HTMLButtonElement>document?.getElementById("price_btn")
            btn.addEventListener("click", () => this.filterByPrice())
        } else {
            if (this.rootCnt.firstChild) {
                this.rootCnt.removeChild(this.rootCnt.firstChild)
            }
            this.isFilterVisible = false
        }
    }

    public filterByPrice(event?: any) {
        if (event == undefined) {
            this.rangeFlag = true
            this.filterItem()
        } else {
            if (event.target instanceof HTMLInputElement && event.target.type == 'text') {
                if (event.target.id === 'price_from') {
                    this.filterPrice[0] = Number(event.target.value)
                } else if (event.target.id === 'price_to') {
                    this.filterPrice[1] = Number(event.target.value)
                }
                this.filterValues.set('price', this.filterPrice)
            }
        }
    }

    private setFilterParam(event: any) {
        if (event.target instanceof HTMLInputElement && event.target.type == 'checkbox') {
            let targetGroup: HTMLElement = <HTMLElement>event.target.parentNode?.parentNode?.parentNode
            let target: HTMLInputElement = <HTMLInputElement>event.target
            if (targetGroup.id == 'color') {
                if (event.target.checked) {
                    this.filterColors.push(Color[target.id as keyof typeof Color])
                    this.filterValues.set('color', this.filterColors)
                } else {
                    this.filterColors.splice(this.filterColors.indexOf(Color[target.id as keyof typeof Color]))
                    this.filterValues.set('color', this.filterColors)
                }
            } else if (targetGroup.id == 'os') {
                if (event.target.checked) {
                    this.filterOs.push(Os[target.id as keyof typeof Os])
                    this.filterValues.set('os', this.filterOs)
                } else {
                    this.filterOs.splice(this.filterOs.indexOf(Os[target.id as keyof typeof Os]))
                    this.filterValues.set('os', this.filterOs)
                }
            } else if (targetGroup.id == 'memory') {
                let storageValue = target.id.substr(2)
                if (event.target.checked) {
                    this.filterMemory.push(storageValue)
                    this.filterValues.set('storage', this.filterMemory)
                } else {
                    this.filterMemory.splice(this.filterMemory.indexOf(storageValue))
                    this.filterValues.set('storage', this.filterMemory)
                }
            }
        }
        this.filterItem()
    }

    private filterItem() {
        let dataToFilter: Array<ProductItem> = this.homeContainer.productData
        let filteredData: Array<ProductItem> = new Array<ProductItem>()
        if (dataToFilter) {
            filteredData = dataToFilter.filter((product) => {
                let isColor = product.color.some((color: string) => this.hasFilterData(this.filterValues.get('color'), color))
                let isStorage = this.hasFilterData(this.filterValues.get('storage'), String(product.storage))
                let isOs = this.hasFilterData(this.filterValues.get('os'), String(product.os))
                if (this.rangeFlag) {
                    let isPrice = this.hasRangeMatches(product.price)
                    return isColor && isOs && isStorage && isPrice
                }
                return isColor && isOs && isStorage
            })
        }
        console.log(filteredData.length)

        if (filteredData.length == 0) {
            console.log('No matches')
        }
        this.homeContainer.render(filteredData)
    }

    private hasFilterData(filterTags: Array<any> | undefined, productTag: string): boolean {
        if (filterTags != undefined && filterTags?.length != 0) {
            return filterTags.includes(productTag)
        }
        return true
    }

    private hasRangeMatches(productPrice: number): boolean {
        if (this.filterPrice[0] && this.filterPrice[1]) {
            return productPrice >= this.filterPrice[0] && productPrice <= this.filterPrice[1]
        } else if (this.filterPrice[0] && !this.filterPrice[1]) {
            return productPrice >= this.filterPrice[0]
        } else if (!this.filterPrice[0] && this.filterPrice[1]) {
            return productPrice <= this.filterPrice[1]
        } else {
            return true
        }
    }
}
