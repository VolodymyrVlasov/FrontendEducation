import {Api, HttpResponse} from "./api/index.js"
import {PexelsPopularVideoResponse, PexelsVideo} from "./models/index.js";
import {ApiConfig} from "./api/ApiConfig.js";

export class VideoContainer {
    private pexelsApi = new Api();

    public run(htmlPart: boolean, githubLink: string): void {

        let request: Request = new Request(
            ApiConfig.apiURL,
            {
                method: 'GET',
                headers: {
                    'Authorization': ApiConfig.apiKey,
                }
            }
        )

        this.pexelsApi.getVideoAPIData<PexelsPopularVideoResponse>(request)
            .then((response: HttpResponse<PexelsPopularVideoResponse>) => {

                if (response.status == 200) {
                    // console.log(response)
                    this.renderVideoCard(htmlPart, githubLink, response);
                } else {
                    throw new Error("Unsuccessful status code");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    private renderVideoCard(
        htmlPart: boolean,
        githubLink: string,
        responseJson: HttpResponse<PexelsPopularVideoResponse>): void {

        if (responseJson.jsonBody != undefined) {
            if (htmlPart) {
                let rootCnt = document?.getElementById('root_cnt')
                // @ts-ignore
                let gitLink: HTMLLinkElement | null = document?.getElementById('git')

                if (gitLink != null) {
                    gitLink.href = githubLink
                }

                if (rootCnt != null) {
                    rootCnt.innerHTML = ''
                    rootCnt.className = 'u_root'

                    responseJson.jsonBody.videos.forEach((video: PexelsVideo) => {
                        if (rootCnt != null) {
                            rootCnt.innerHTML += `
                                <div class="pexels_video_card">
                                    <video class="pexels_video" src="${video.video_files[0].link}" controls="true"/>                                                    
                                </div>
                            `
                        }
                    })
                }
            }
        }

        let videos: HTMLCollectionOf<Element> = document.getElementsByClassName("pexels_video")

        Array.from(videos).forEach((video: Element) => {
            video.addEventListener("mouseover", () => {
                console.log(video)
                video.play() // todo cast to HTMLVideoElement
            })
            video.addEventListener("mouseout", () => {
                video.pause() // todo cast to HTMLVideoElement
            })
        })

    }
}
