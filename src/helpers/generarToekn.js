import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, "123", { expiresIn: "30d" });
    return token;
  } catch (error) {
    console.log("error al generar token", error.message);
  }
};
