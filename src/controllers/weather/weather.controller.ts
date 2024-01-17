import { Request, Router } from "express";

import { MyResponse } from "../../models/myResponse.type";
import { catchError } from "../../utils/catch_error";
import { Controller } from "../controller.type";

export class WeatherController implements Controller {
	public path = "/weather";
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		this.router.get("", catchError(this.getWeather));
	}

	private getWeather = (
		req: Request<undefined, undefined, undefined, undefined>,
		res: MyResponse<{ weather: string }>
	): void => {
		res.send({ data: { weather: "sunny" }, message: "Working" });
	};
}
