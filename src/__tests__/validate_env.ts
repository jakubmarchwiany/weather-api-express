import { cleanEnv, num, str } from "envalid";

export const ENV_TESTS = cleanEnv(process.env, {
	API_URL: str()
});
