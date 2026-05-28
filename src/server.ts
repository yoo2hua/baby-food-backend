import app from "./app";
import { env } from "./config/env";

// 环境变量校验（fail-fast）
console.log("✅ 环境变量加载成功");

app.listen(env.PORT, () => {
  console.log(`server running http://localhost:${env.PORT}`);
});