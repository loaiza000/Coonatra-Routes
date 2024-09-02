import bcrypt from "bcrypt";

export const encryptPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordEncryptada = bcrypt.hashSync(password, salt);
    return passwordEncryptada;
  } catch (error) {
    console.log("error al encryptar password", error.message);
  }
};
