const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db.js");
const req = require("express/lib/request");

const app = express();
const port = process.env.PORT || 1205;

// middleware setup
app.use(morgan("common"));
db();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * mongoDB schema
 * mongoDB = documentDB = json 형태 그대로 저장
 * document가 생성될 때 id가 생성되는데, id에 server timestamp가 같이 포함되어 있음
 * 높은 유연성을 유지하기 위해 이외의 정보는 extraData 필드에 추가적인 정보를 넣음
 */
const AppLogs = mongoose.model("AppLogs", {
  service: String,
  application: String,
  screen: String,
  event: String,
  user: String,
  extraData: String,
  clientTimestamp: Number,
});

app.get("/api/logs", async (req, res) => {
  const appLogs = await AppLogs.find();

  res.send(appLogs);
});

app.post("/api/logs", async (req, res) => {
  const appLogs = new AppLogs({
    service: req.body.service,
    application: req.body.application,
    screen: req.body.screen,
    event: req.body.event,
    user: req.body.user,
    extraData: req.body.extraData,
    clientTimestamp: req.body.clientTimestamp,
  });

  await appLogs.save();
  res.status(201).send({
    status: "OK",
    statusCode: 201,
  });
});

app.listen(port, () => {
  console.log(`ready to ${port}`);
});
