import {UnspashAPI, HttpResponse, UnsplashRandomPhotoResponse} from "./UnspashAPI.js";

const accessKey = 'G-dDBYYwpuIuTK2yXSjJziVMwsk3M0Lrwom3TCsBkGM'

export class PictureContainer {
    private static unsplashApi = new UnspashAPI();
    
    static renderContainer(htmlPart: boolean, githubLink: string) {
        let request: Request = new Request(
            "https://api.unsplash.com/photos?per_page=28&order_by=popular",
            {
                method: 'GET',
                headers: {
                    // 'per_page': `20`,
                    // 'order_by': 'popular',
                    'Authorization': `Client-ID ${accessKey}`,
                }
            }
        )

        console.log(request);
        
        this.unsplashApi.getImageAPIData<UnsplashRandomPhotoResponse>(request)
            .then((response: HttpResponse<UnsplashRandomPhotoResponse>) => {

                if (response.status == 200) {
                    this.renderUpsplashCard(response, htmlPart, githubLink);
                } else {
                    throw new Error("Unsucsessful status code");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    static renderUpsplashCard(
        responseJson: HttpResponse<UnsplashRandomPhotoResponse>,
        htmlPart: boolean,
        githubLink: string): void {

        if (responseJson.jsonBody != undefined) {
            console.log(responseJson.jsonBody)
            if (htmlPart) {
                let rootCnt = document?.getElementById('root_cnt')
                // @ts-ignore
                let gitLink: HTMLLinkElement | null = document.getElementById('git')
                
                if (gitLink != null) {
                    gitLink.href = githubLink
                }
        
                if (rootCnt != null) {
                    rootCnt.innerHTML = ''
                    rootCnt.className = 'u_root'

                    responseJson.jsonBody.forEach((element) => {
                            if (rootCnt != null) {
                                rootCnt.innerHTML += `


                                        <div class="u_card" style="background: url(${element.urls.small});">
                                        <div class="u_gradient">
                                            <div class="u_info">
                                                <div class="u_row">
                                                    <span class="u_username">${element.user.username[0].toUpperCase() + element.user.username.substring(1)}</span>
                                                    <span class="u_likes">
                                                        <img
                                                            src="./scr/tasks/task_3/img/like.png">
                                                            ${element.likes}</span>
                                                </div>
                                                <div class="u_row_description">
                                                    <span class="u_description">${element.alt_description}</span>
                                                </div>
                                                <div class="u_row">
                                                    <a target="_tab" class="fake_button" href="${element.urls.small}">small</a>
                                                    <a target="_tab" class="fake_button" href="${element.urls.regular}">regular</a>
                                                    <a target="_tab" class="fake_button" href="${element.urls.full}">full</a>
                                                    <a target="_tab" class="fake_button" href="${element.urls.raw}">raw</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            `
                            }
                        }
                    )
                }
            }
        }
    }
}