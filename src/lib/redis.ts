import { Redis } from "ioredis";

//esta usando prta local padrao, por isso n preciso passa nada
export const redis = new Redis()