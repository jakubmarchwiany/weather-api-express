import { Response } from "express";

export type MyResponse<T> = Response<{ data?: T; message: string }>;
