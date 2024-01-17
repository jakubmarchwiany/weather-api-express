import { json, urlencoded } from "body-parser";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import express from "express";

import { Controller } from "./controllers/controller.type";
import { errorMiddleware } from "./middleware/error.middleware";
import { HttpException } from "./middleware/exceptions/http.exception";
import { ENV } from "./utils/validate_env";

const { API_PREFIX, PORT, WHITELISTED_DOMAINS } = ENV;

const WHITELIST = WHITELISTED_DOMAINS ? WHITELISTED_DOMAINS.split(",") : [];

class Server {
	public app: express.Application;

	constructor(controllers: Controller[]) {
		this.app = express();

		this.initMiddlewares();

		this.initializeControllers(controllers);

		this.initErrorMiddleware();
	}

	private initMiddlewares(): void {
		this.initializeCors();

		this.app.use(json({ limit: "10MB" }));

		this.app.use(urlencoded({ extended: true, limit: "10MB" }));

		this.app.use(compression());
	}

	private initializeCors(): void {
		const corsOptions: CorsOptions = {
			credentials: true,
			origin: WHITELIST
		};

		this.app.use(cors(corsOptions));
	}

	private initializeControllers(controllers: Controller[]): void {
		controllers.forEach((controller) => {
			this.app.use(API_PREFIX + controller.path, controller.router);
		});

		this.app.use("*", (req, res, next) => {
			next(new HttpException(404, "Not found"));
		});
	}

	private initErrorMiddleware(): void {
		this.app.use(errorMiddleware);
	}

	public listen(): void {
		this.app.listen(PORT, () => {
			console.log(
				`Server listening on the port ${PORT}\nhttp://localhost:${PORT}${API_PREFIX}`
			);
		});
	}
}
export default Server;
