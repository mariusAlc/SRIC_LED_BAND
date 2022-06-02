import { AsyncMqttClient } from "async-mqtt"; // import connect from mqtt

export class MQTT {
	private static INSTANCE?: MQTT;
	public client: AsyncMqttClient | undefined;

	async send (code: string): Promise<boolean> {
		try {
			await this.client?.publish("mariusAlc/SRIC/IR/RC", code);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public static getInstance (): MQTT {
		if (!this.INSTANCE) {
			this.INSTANCE = new MQTT();
		}
		return this.INSTANCE;
	}
}

export default MQTT.getInstance();
