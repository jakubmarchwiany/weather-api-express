import { InferType, object, string } from "yup";

const getWeatherSchema = object({
	query: object({
		cityName: string().required().min(2)
	})
});

type GetWeatherData = InferType<typeof getWeatherSchema>;

export { GetWeatherData, getWeatherSchema };
