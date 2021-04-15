import {UnspashAPI, HttpResponse, UnsplashRandomPhotoResponse} from "./UnspashAPI.js";

const accessKey = 'G-dDBYYwpuIuTK2yXSjJziVMwsk3M0Lrwom3TCsBkGM'

export class PictureContainer {
    private static unsplashApi = new UnspashAPI();
    
    static renderContainer(htmlPart: boolean, githubLink: string) {
        let request: Request = new Request(
            "https://api.unsplash.com/photos/?client_id=",
            {
                method: 'GET',
                headers: {
                    'Authorization': `Client-ID ${accessKey}`,
                }
            }
        )

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
                                        <div class="u_card">
                                            <img class="img" src="${element.urls.small}" alt="${element.alt_description}">
                                            <div class="u_row">
                                                <span class="u_username">${element.user.username}</span>
                                                <span class="u_username"><img class="u_likes" src="data:image/png;base64,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">${element.likes}</span>
                                            </div>
                                            <div class="u_row_description">
                                                <span class="u_description">${element.alt_description}</span>
                                            </div>
                                            <div class="u_row">
                                                <a target="_tab" class="fake_button" href="${element.urls.raw}">raw</a>
                                                <a target="_tab" class="fake_button" href="${element.urls.full}">full</a>
                                                <a target="_tab" class="fake_button" href="${element.urls.regular}">regular</a>
                                                <a target="_tab" class="fake_button" href="${element.urls.small}">small</a>
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