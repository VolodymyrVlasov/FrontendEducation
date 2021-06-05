import {Color, Memory, Os} from "../types/index.js";
import {FilterItem, IFilterItem} from "./FilterItem.js";
import {HomeContainer} from "../containers/HomeContainer";
import {ProductItem} from "../models/ProductItem";

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
    private readonly filterPrice: Array<number>
    private homeContainer: HomeContainer

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
            filtersCnt.append(this.filterPriceCard.renderPriceFilter())

            this.filterData.forEach((e) => {
                filtersCnt.append(e.render())
            })

            filtersCnt.addEventListener('input', (event) => {
                this.setFilterParam(event)
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

    private setFilterParam(event: Event) {
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
                    this.filterValues.set('os', this.filterColors)
                } else {
                    this.filterOs.splice(this.filterOs.indexOf(Os[target.id as keyof typeof Os]))
                    this.filterValues.set('os', this.filterOs)
                }
            } else if (targetGroup.id == 'memory') {
                if (event.target.checked) {
                    this.filterMemory.push(Memory[target.id as keyof typeof Memory])
                    this.filterValues.set('storage', this.filterMemory)
                } else {
                    this.filterMemory.splice(this.filterMemory.indexOf(Memory[target.id as keyof typeof Memory]))
                    this.filterValues.set('storage', this.filterMemory)
                }
            }
        } else if (event.target instanceof HTMLInputElement && event.target.type == 'text') {
            if (event.target.id === 'price_from') {
                this.filterPrice[0] = Number(event.target.value)
            } else if (event.target.id === 'price_to') {
                this.filterPrice[1] = Number(event.target.value)
            }
            this.filterValues.set('price', this.filterPrice)
        }
        this.filterItem()
    }

    private filterItem() {
        console.log(this.homeContainer.productData)
        let dataToFilter: Array<ProductItem> = this.homeContainer.productData
        let filteredData: Array<ProductItem> = new Array<ProductItem>()
        if (dataToFilter) {
            // this.filterValues.forEach((value, key) => {
            //     filteredData = dataToFilter.filter((product) => {
            //         return Array(product[key as keyof typeof product]).some((value1: any) => {
            //             return value?.includes(value1)
            //         })
            //     })
            // })
            filteredData = dataToFilter.filter((product) => {
                return product.color.some((color: string) => {
                        return this.filterValues.get('color')?.includes(color)
                    }
                )
            })
        }
        this.homeContainer.render(filteredData.length == 0 ? dataToFilter : filteredData)
    }
}
