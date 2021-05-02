import {PexelsVideoFile} from "./PexelsVideoFile.js";

export interface PexelsVideo {
    image: string;
    video_files: PexelsVideoFile[];
}