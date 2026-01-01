import * as amqp from "amqplib";

/**
 * mq client class for rabbitmq 
 * methods to connect to rabbitmq server    
 * 
 */

export class MQClient {

    /**
     * method to connect to rabbitmq server with url
     * @param url 
     * @returns 
     */

    public static async connectWithUrl(url: string): Promise<any> {
        try {
            return await amqp.connect(url);
        } catch (error) {
            throw new Error(`method: connectWithUrl class: MQClient error: ${error}`);
        }
    }

    public static async connectWithCredentials(
        host: string,
        port: number,
        username: string,
        password: string,
        vhost = "/"
    ): Promise<amqp.Connection> {
        try {
            const user = encodeURIComponent(username);
            const pass = encodeURIComponent(password);
            const v = vhost ? `/${encodeURIComponent(vhost)}` : "";
            const url = `amqp://${user}:${pass}@${host}:${port}${v}`;
            return await this.connectWithUrl(url);
        } catch (error) {
            throw new Error(`method: connectWithCredentials class: MQClient error: ${error}`);
        }
    }

    public static async connectWithOptions(options: amqp.Options.Connect): Promise<any> {
        try {
            return await amqp.connect(options as any);
        } catch (error) {
            throw new Error(`method: connectWithOptions class: MQClient error: ${error}`);
        }
    }


    public static async connectWithTLS(
        urlOrOptions: string | amqp.Options.Connect,
        tlsOptions?: { cert?: Buffer | string; key?: Buffer | string; ca?: Buffer | string[]; passphrase?: string }
    ): Promise<any> {
        try {
            if (typeof urlOrOptions === "string") {
                return await amqp.connect(urlOrOptions);
            }
            const merged: any = { ...(urlOrOptions as object) };
            if (tlsOptions) Object.assign(merged, tlsOptions);
            return await amqp.connect(merged);
        } catch (error) {
            throw new Error(`method: connectWithTLS class: MQClient error: ${error}`);
        }
    }

    public static async connectWithRetry(
        connectFactory: () => Promise<amqp.Connection>,
        retries = 5,
        delayMs = 2000
    ): Promise<amqp.Connection> {
        let attempt = 0;
        let lastError: any;
        while (attempt <= retries) {
            try {
                return await connectFactory();
            } catch (err) {
                lastError = err;
                attempt += 1;
                if (attempt > retries) break;
                await new Promise((res) => setTimeout(res, delayMs));
            }
        }
        throw new Error(`method: connectWithRetry class: MQClient error: ${lastError}`);
    }

    public static async createChannel(connection: amqp.Connection): Promise<amqp.Channel> {
        try {
            const anyConn = connection as any;
            if (typeof anyConn.createChannel === "function") return await anyConn.createChannel();
            return await (connection as any).createChannel();
        } catch (error) {
            throw new Error(`method: createChannel class: MQClient error: ${error}`);
        }
    }


    public static async closeConnection(connection: amqp.Connection): Promise<void> {
        try {
            const anyConn = connection as any;
            if (typeof anyConn.close === "function") await anyConn.close();
        } catch (error) {
            throw new Error(`method: closeConnection class: MQClient error: ${error}`);
        }
    }

    public async mqclientPublish(payload: object, options: object): Promise<void> {
        try {
            const { exchange, routingKey, topic } = options as { exchange: string; routingKey: string; topic: string };
            // Example usage (recommended pattern: use a shared connection from rabbitmq/connection.ts):
            // const conn = await MQClient.connectWithUrl(process.env.AMQP_URL);
            // const ch = await MQClient.createChannel(conn);
            // await ch.assertExchange(exchange, 'topic', { durable: true });
            // ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)));
            // await MQClient.closeConnection(conn);
        } catch (error) {
            throw new Error(`method: mqclientPublish \n                class: MQClient\n                error : ${error}`);
        }
    }

}
