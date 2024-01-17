/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { expect } from "bun:test";
import request, { Request } from "supertest";

import { ENV_TESTS } from "./validate_env";

const { API_URL } = ENV_TESTS;

export const authPostRequest = (url: string, token: string): request.Request => {
	return request(API_URL)
		.post(url)
		.set("Authorization", `Bearer ${token}`)
		.set("Accept-Encoding", "");
};

export function expectedBody(p: any): any {
	return { data: { ...p }, message: expect.any(String) };
}

// export const getUserToken = async (): Promise<string> => {
// 	const res = await request(API_URL).post("/auth/login").send({
// 		password: PASSWORD_CORRECT,
// 		username: USERNAME_CORRECT
// 	});

// 	return res.body.data.token;
// };

// export const authGetRequest = (url: string, token: string): Request => {
// 	return request(API_URL)
// 		.get(url)
// 		.set("Authorization", `Bearer ${token}`)
// 		.set("Accept-Encoding", "");
// };
