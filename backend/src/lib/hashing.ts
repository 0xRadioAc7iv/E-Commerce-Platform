import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashText = (text: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(text, salt);
};

export const compareText = (plainText: string, hashedText: string) => {
  return bcrypt.compareSync(plainText, hashedText);
};
