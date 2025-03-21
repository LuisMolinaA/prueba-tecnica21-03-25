import { Router } from "express";
import passport from "../auth/auth"
import { authService } from "../auth/authValidate";
import { registerUserController } from "../controllers/controllers";

export const userRouter: Router = Router();

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

userRouter.post("/register", registerUserController.run.bind(registerUserController));
// Ruta protegida de ejemplo
userRouter.get("/perfil", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: req.user });
});
