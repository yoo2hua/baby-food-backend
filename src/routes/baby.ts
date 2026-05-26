import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { createBaby, getBabies } from "../services/baby.service";

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

  res.json(baby);
});

// 获取宝宝列表
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  const babies = await getBabies(req.user.userId);
  res.json(babies);
});

export default router;