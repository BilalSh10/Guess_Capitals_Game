import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import itemsRouter from './routes/Items.js';

let port = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", itemsRouter);


app.listen(port, () => {
    console.log("Server listening on port " + port);
});
