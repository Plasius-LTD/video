export interface VideoPackageInfo {
  name: "@plasius/video";
  version: string;
}

export const videoPackageInfo: VideoPackageInfo = {
  name: "@plasius/video",
  version: "0.1.6",
};

export * from "./ai-video-generation/index.js";
