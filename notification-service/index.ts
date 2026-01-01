import express from 'express'
import 'dotenv/config'
import { initRabbitMQ } from './rabbitmq/connection'

const app = express();
const port  = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.send('Notification Service is running!');
});


app.listen(port, () => {
  console.log(`Notification Service is listening on port ${port}`);
  initRabbitMQ().catch((err) => {
    console.error('Failed to initialize RabbitMQ connection', err);
  });
});