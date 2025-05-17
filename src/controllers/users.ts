import { request, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users";
import  jwt  from "jsonwebtoken";


export const register = async (req: Request, res: Response) => {
  const { username, name, lastname, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.findOne({ where: { email: email } });

  if (user) {
    return res.status(400).json({
      msg: `Usuario ya existente con el email ${email}`,
    });
  }

  try {
    User.create({
      username: username,
      name: name,
      lastname: lastname,
      email: email,
      password: passwordHash,
      status: 1,
    });

    res.json({
      msg: `User ${name} ${lastname} create success...`,
    });
  } catch (error) {
    res.status(400).json({
      msg: `Hubo un error al crear al usuario ${name} ${lastname}`,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const whereClause = username ? { username } : email ? { email } : null;

  if (!whereClause) {
    return res.status(400).json({ msg: "Debes proporcionar username o email" });
  }

  const user:any = await User.findOne({ where: whereClause });

  if (!user) {
    return res.status(400).json({
      msg: `Usuario no existente`,
    });
  }

  const passwordValid = await bcrypt.compare(password, user.password)

  if (!passwordValid) {
    return res.status(400).json({
      msg: `Contraseña incorrecta`,
    });
  }

  const token = jwt.sign({
    email: email
    }, process.env.SECRET_KEY || 'Doomer-@2003');

    res.json({
        token,
        username: user.username,
        id: user.id
    })
};
