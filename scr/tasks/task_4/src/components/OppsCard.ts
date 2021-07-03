export class OopsCard {
    public static scheduleRender() {
        let doc: HTMLElement = <HTMLElement>document?.getElementsByTagName('body')[0]
        doc.appendChild(this.getCard())
        setTimeout(this.removeOopsCard, 2000)
    }

    private static getCard(): HTMLDivElement {
        let card: HTMLDivElement = document.createElement('div')
        card.addEventListener('click', () => this.removeOopsCard())
        card.innerHTML = `
        <div class="popup_search" id="popup_search_no_matches">
            <div  class="popup_search_no_matches">
                <p>Oops...</p>
                <span>We didn't find any product by selected parameters</span>
                <span>Please select another characteristic or search request</span>
            </div>
        </div>
        `
        return card
    }

    private static removeOopsCard(): void {
        let doc: HTMLElement = <HTMLElement>document?.getElementById('popup_search_no_matches')
        doc.style.opacity = '0'
        setTimeout(() => doc?.parentElement?.removeChild(doc), 300)
    }
}