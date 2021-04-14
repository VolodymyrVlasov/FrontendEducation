import {Api, HttpResponse, UnsplashRandomPhotoResponse} from "./Api.js";

const accessKey = 'G-dDBYYwpuIuTK2yXSjJziVMwsk3M0Lrwom3TCsBkGM'

export class ImageContainer {
    private static unsplashApi = new Api();


    //GET /photos/:id/statistics
    // https://api.unsplash.com/photos/?client_id=${accessKey}
    static render() {
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
                    this.renderUpsplashCard(response);
                } else {
                    throw new Error("Unsucsessful status code");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    static renderUpsplashCard(responseJson: HttpResponse<UnsplashRandomPhotoResponse>): void {

        console.log(responseJson.jsonBody)
        /** todo
         * create html part with default (small size) image and ifo about image
         */
    }
}