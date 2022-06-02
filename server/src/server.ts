import express from "express";
import history from "connect-history-api-fallback";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

import routes from "@routes/index";
import mqtt from "async-mqtt";
import mqttInstance from "./mqtt";
const envVars: string[] = [
	"MQTT_URL"
];
const allowedOrigins = [
	"http://localhost:8080"
];

function verifyEnv (envVar: string) {
	if (process.env[envVar] === undefined) {
		throw new Error(`ENV variable ${envVar} is missing`);
	}
}

async function main () {
	try {
		// Create a new express app instance
		const app: express.Application = express();

		// init env vars
		dotenv.config({ path: path.join(__dirname, ".env") });
		// ensure that env vars exists
		for (const envVar of envVars) {
			verifyEnv(envVar);
		}

		const client = await mqtt.connectAsync("http://broker.mqtt-dashboard.com/", {
			port: 1883,
			protocol: "mqtt"
		});
		mqttInstance.client = client;
		// TO BE REMOVED
		// UI TESTING
		const publicPath = path.resolve("../ui/dist");

		// Express body parser
		app.use(express.json());

		app.use(express.static(publicPath));
		app.use(history({
			index: "index.html"
		}));
		app.use(express.static(publicPath));

		app.use(cors({
			origin: allowedOrigins,
			credentials: false
		}));
		// Express routes
		app.use(routes);
		// handles 404 errors
		app.use(function (req, res, next) {
			res.sendStatus(404);
		});

		const PORT: number = parseInt(process.argv[2]) || 5000;
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
}

main();
