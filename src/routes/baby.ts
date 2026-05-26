import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { createBaby, getBabies } from "../services/baby.service";
import { response } from "../common/utils/response";

const router: Router = Router();

// 创建宝宝
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { name, birthday, gender } = req.body;

  const baby = await createBaby(
    req.user.userId,
    name,
    birthday,
    gender
  );

  return res.json(response.success(baby));
});

// 获取宝宝列表
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const babies = await getBabies(req.user.userId);
  return res.json(response.success(babies));
});

export default router;
