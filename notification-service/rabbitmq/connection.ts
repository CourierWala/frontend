import * as amqp from "amqplib";
import { MQClient } from "./mqclient";

let connection: amqp.Connection | null = null;

/**
 * Initialize a shared RabbitMQ connection for the process.
 * Call this once at server startup.
 *
 * Options:
 * - url: full amqp/amqps url (overrides other options)
 * - retries, delayMs: retry behavior passed to connectWithRetry
 */
export async function initRabbitMQ(options?: {
  url?: string;
  retries?: number;
  delayMs?: number;
  connectFactory?: () => Promise<amqp.Connection>;
}): Promise<amqp.Connection> {
  if (connection) return connection;

  const factory:any = options?.connectFactory
    ?? (options?.url ? () => MQClient.connectWithUrl(options!.url!) : () => MQClient.connectWithUrl(process.env.AMQP_URL || "amqp://localhost"));

  connection = await MQClient.connectWithRetry(factory, options?.retries ?? 5, options?.delayMs ?? 2000);

  connection.on("error", (err) => {
    console.error("RabbitMQ connection error:", err);
  });

  connection.on("close", () => {
    console.warn("RabbitMQ connection closed");
    connection = null;
  });

  // graceful shutdown
  const shutdown = async () => {
    try {
      if (connection) {
        const anyConn = connection as any;
        if (typeof anyConn.close === "function") await anyConn.close();
      }
    } catch (e) {

    }
    process.exit(0);
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);

  return connection;
}

export function getConnection(): amqp.Connection {
  if (!connection) throw new Error("RabbitMQ connection not initialized. Call initRabbitMQ() first.");
  return connection;
}

export async function getChannel(): Promise<amqp.Channel> {
  const conn = getConnection();
  const anyConn = conn as any;
  if (typeof anyConn.createChannel === "function") return await anyConn.createChannel();
  return await (conn as any).createChannel();
}

export async function getConfirmChannel(): Promise<amqp.ConfirmChannel> {
  const conn = getConnection();
  const anyConn = conn as any;
  if (typeof anyConn.createConfirmChannel === "function") return await anyConn.createConfirmChannel();
  return (await (conn as any).createConfirmChannel()) as amqp.ConfirmChannel;
}

export async function closeRabbitMQ(): Promise<void> {
  if (!connection) return;
  try {
    const anyConn = connection as any;
    if (typeof anyConn.close === "function") await anyConn.close();
  } finally {
    connection = null;
  }
}

export default {
  initRabbitMQ,
  getConnection,
  getChannel,
  getConfirmChannel,
  closeRabbitMQ,
};
