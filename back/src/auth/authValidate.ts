import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
dotenv.config();

export class authService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      throw new Error("Credenciales incorrectas");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "6h",
    });

    return { token, user };
  }

  static async register(email: string, password: string,permisos:string) {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El usuario ya está registrado");
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({ email, password: hashedPassword,permisos });

    return newUser;
  }
}
