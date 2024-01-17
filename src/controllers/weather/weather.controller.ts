/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, Router } from "express";

import { GetWeatherData, getWeatherSchema } from "../../middleware/schemas/get_weather.schema";
import { validate } from "../../middleware/validate.middleware";
import { catchError } from "../../utils/catch_error";
import { myFetch } from "../../utils/myFetch";
import { ENV } from "../../utils/validate_env";
import { Controller } from "../controller.type";

const { WEATHER_API_KEY } = ENV;

export class WeatherController implements Controller {
	public path = "/weather";
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.post("", validate(getWeatherSchema), catchError(this.getWeather));
	}

	private getWeather = (
		req: Request<undefined, undefined, GetWeatherData["body"], undefined>,
		res: Response
	): void => {
		const { cityName } = req.body;

		try {
			myFetch<any>(
				`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${WEATHER_API_KEY}`,
				{ method: "GET" }
			)
				.then((d) => {
					const weatherInfo = {
						cityName: d.name,
						condition: d.weather[0].main,
						date: new Date(Number(d.dt * 1000 + d.timezone * 1000)),
						humidity: d.main.humidity,
						temperature: (Math.round(d.main.temp * 10) / 10).toFixed(0),
						windSpeed: d.wind.speed
					};

					res.send(weatherInfo);
				})
				.catch((e) => {
					if (e.cod == 404) {
						res.status(404).send({ message: "City not found", statusCode: 404 });
					} else {
						res.status(500).send({ message: "Failed to download weather" });
					}
				});
		} catch (error) {
			throw new Error("Failed to download weather");
		}
	};
}
