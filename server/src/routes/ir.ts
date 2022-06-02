import express, { Response, Request } from "express";
import { IServerRES } from "@common/server";
import mqtt from "../mqtt/index";
import { ServerError } from "@common/errors";

const router = express.Router();

router.post("/send",
	async (
		req: Request<{
			code: string
		}>,
		res: Response<IServerRES<boolean>>
	) => {
		try {
			const { code } = req.body;
			const response = await mqtt.send(code);
			res.status(200).send({
				payload: response,
				err: ServerError.NO_ERROR
			});
		} catch (error) {
			const e = error as Error;
			console.error(e);
			res.sendStatus(500);
		}
	}
);

export default router;
