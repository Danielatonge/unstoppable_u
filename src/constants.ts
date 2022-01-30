import { Dimensions } from "react-native";

export const TABBAR_HEIGHT = 70;
export const PIXEL_COUNT = 16;
export const HEADER_HEIGHT = 40;
export const PROFILE_HEADER_HEIGHT = 100;

export const PROFILE_BANNER_URL =
  "https://cdn.discordapp.com/attachments/934291385157296148/937313626090532924/default-banner.png";

export enum STATES {
  IDLE = "IDLE",
  LOADING = "LOADING",
  LOADING_BACKGROUND = "LOADING_BACKGROUND",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface User {
  id: string;
  username: string;
  name: string;
  imageUri: string;
}

export const MENTOR_BG = [
  "https://cdn.discordapp.com/attachments/934291385157296148/937446216407605349/bgm1.png",
  "https://cdn.discordapp.com/attachments/934291385157296148/937446216155934740/bgm2.png",
  "https://cdn.discordapp.com/attachments/934291385157296148/937469509223198760/bgm3.png",
];
