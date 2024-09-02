import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/generarToekn.js";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

const userController = {};

userController.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userNameRepited = await userModel.findOne({ name: name });
    if (userNameRepited) {
      return response(
        res,
        400,
        false,
        "",
        "el nombre de usuario ya esta registrado"
      );
    }

    if (name.length < 3) {
      return response(
        res,
        400,
        false,
        "",
        "el nombre debe ser mayor a 3 caracteres"
      );
    }

    const emailRepited = await userModel.findOne({ email: email });
    if (emailRepited) {
      return response(res, 400, false, "", "el email ya esta registrado");
    }

    if (password.length < 6) {
      return response(
        res,
        400,
        false,
        "",
        "la contraseña debe tener mas de 6 caracteres"
      );
    }

    const passwordEncrypt = encryptPassword(password);
    const newUser = userModel.create({ email, password: passwordEncrypt });
    await newUser.save();
    const token = generateToken({ user: newUser._id });
    return response(
      res,
      201,
      true,
      { ...newUser._doc, password: null, token },
      "usuario creado"
    );
  } catch (error) {
    return response(req, 501, false, "", error.message);
  }
};

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken({ user: user._id });
      return response(
        res,
        200,
        true,
        { ...user.toJSON(), password: null, token },
        "bienvenido"
      );
    }

    return response(res, 400, false, "", "email o password incorrectos");
  } catch (error) {
    return response(req, 501, false, "", error.message);
  }
};

export default userController;
