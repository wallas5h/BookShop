import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const REF_TOKEN_KEY = 'MNBVCSDGHOIUYWERT457CVBWEUIMNBVCWvb5678fg';
export const ACCESS_TOKEN_KEY = 'OPASDFGHJKLZXCVBNM123456789MNBV';

export async function encryptText(params: string): Promise<string> {
  const encrypted = await bcrypt.hash(params, 10);
  return encrypted;
}
export async function compareText(text: string, hash: string) {
  const isMatch = await bcrypt.compare(text, hash);
  return isMatch;
}

export async function createSesionToken(data: object) {
  try {
    let token = await jwt.sign(data, ACCESS_TOKEN_KEY, {
      expiresIn: '30m'
    });
    return token;

  } catch (error) {
    throw new Error(error)
  }
}
export async function createRefreshToken(data: object) {
  try {
    let token = await jwt.sign(data, REF_TOKEN_KEY);
    return token;

  } catch (error) {
    throw new Error(error)
  }
}