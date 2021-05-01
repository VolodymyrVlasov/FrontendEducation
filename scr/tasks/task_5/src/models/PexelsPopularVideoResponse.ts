import {PexelsVideo} from "./PexelsVideo.js";

export interface PexelsPopularVideoResponse {
    per_page: number;
    videos: PexelsVideo[];
}