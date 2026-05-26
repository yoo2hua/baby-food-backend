import { Router } from "express";
import { login, register } from "../services/auth.service";
import { response } from "../common/utils/response";

const router: Router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await register(email, password);

    return res.json(response.success(user));
  } catch (err: any) {
    return res.status(400).json(response.error(err.message, 400));
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    return res.json(response.success(result));
  } catch (e: any) {
    return res.status(400).json(response.error(e.message, 400));
  }
});

export default router;
