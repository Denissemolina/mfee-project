import app from './app';
import mongoose from 'mongoose';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

//Conexión con mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
