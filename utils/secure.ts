import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserRepository } from "../records/UserRepository";
import { tokenEntity } from "../routers/home";

export async function encryptText(params: string): Promise<string> {
  const encrypted = await bcrypt.hash(params, 10);
  return encrypted;
}
export async function compareText(text: string, hash: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(text, hash);
  return isMatch;
}

export async function createSesionToken(data: object) {
  try {
    let token = await jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: '30m'
    });
    return token;

  } catch (error) {
    throw new Error(error)
  }
}

export async function createRefreshToken(data: object) {
  try {
    let token = await jwt.sign(data, process.env.REF_TOKEN_KEY);
    return token;

  } catch (error) {
    throw new Error(error)
  }
}

export async function recognizeUserbyJWT(jwtCookie) {
  let verifyToken = jwt.verify(jwtCookie, process.env.ACCESS_TOKEN_KEY) as tokenEntity;
  const mail = verifyToken.mail;
  return await UserRepository.findOne(mail);
}