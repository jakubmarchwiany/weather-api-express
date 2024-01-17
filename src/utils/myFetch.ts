/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

type FetchMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

export async function myFetch<T>(
	url: string,
	options: {
		body?: null | object;
		headers?: { "Content-Type": "application/json" };
		method: FetchMethod;
	}
): Promise<T> {
	return await new Promise((resolve, reject) => {
		fetch(url, {
			body: JSON.stringify(options.body),
			headers: { "Content-Type": "application/json" },
			method: options.method
		})
			.then(async (response) => {
				const data = (await response.json()) as T;

				if (response.ok) {
					resolve(data);
				} else {
					reject(data);
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
}
