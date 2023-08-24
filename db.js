const mongoose = require("mongoose");
module.exports = () => {
  function connect() {
    try {
      // zenerate-app-log는 DB명
      // mongoDB는 default로 별도 user, root PW 없이 root 접속
      // test는 싱글 커넥션
      mongoose.connect("mongodb://localhost:27017/zenerate-app-log");

      // TODO: connection 풀 셋팅
      // TODO: 대용량 데이터 처리 위한 클러스터 구성
      console.log(`mongodb connected`);
    } catch (err) {
      console.error("mongodb connection error", err);
    }
  }

  connect();
  mongoose.connection.on("disconnected", connect);
};
