import { cleanEnv, num, port, str } from "envalid";

export const ENV = cleanEnv(process.env, {
	// server running port
	API_PREFIX: str(),

	// environment
	NODE_ENV: str({ choices: ["development", "production", "test"] }),

	PORT: port(),

	WEATHER_API_KEY: str(),

	// cors Options
	WHITELISTED_DOMAINS: str()
});
