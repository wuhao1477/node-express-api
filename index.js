import { main } from "./api.js";
import express from "express";
const app = express();

app.listen(80);
console.log("---------快递查询接口已开启--------")
app.get("/", async (req, res) => {
  let order_number = req.query.order_number;
  let data = await main(order_number);
  res.json(data);
});
