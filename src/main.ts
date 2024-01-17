import { WeatherController } from "./controllers/weather/weather.controller";
import Server from "./server";

const app = new Server([new WeatherController()]);

app.listen();
