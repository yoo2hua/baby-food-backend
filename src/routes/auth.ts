import { Router } from "express";
import { login, register } from "../services/auth.service";

const router: Router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await register(email, password);

    res.json(user);
  } catch (err: any) {
    res.status(400).json({
      message: err.message,
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

export default router;