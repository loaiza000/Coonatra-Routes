import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { response } from "../helpers/response.js";

export const authClient = async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const payload = jwt.verify(token, "123");
    const user = await userModel.findById({ _id: payload.user });
    if (!user) {
      return response(req, 401, false, "", "no esta autorizado");
    }

    req.userId = payload.user;
    next();
  } catch (error) {
    return response(req, 401, false, "", "no esta autorizado");
  }

  if (!token) {
    return response(req, 401, false, "", "no esta autorizado");
  }
};
