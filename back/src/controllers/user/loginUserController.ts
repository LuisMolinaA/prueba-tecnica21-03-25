import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import signale from "signale";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class LoginUserController {
    constructor() { }

    async run(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                res.status(400).json({ error: "Correo y contraseña son requeridos." });
                return;
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ error: "El correo electrónico no está registrado." });
                return;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ error: "La contraseña es incorrecta." });
                return;
            }

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { algorithm: 'HS256', expiresIn: "6h" });

            res.status(200).json({
                message: "Inicio de sesión exitoso",
                token,
                user: {
                    email: user.email,
                }
            });

        } catch (error) {
            signale.error("Error al iniciar sesión:", error);
            res.status(500).json({ error: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde." });
        }
    }
}