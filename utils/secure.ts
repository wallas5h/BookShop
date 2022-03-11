import * as bcrypt from "bcrypt";

export async function encryptText(params: string): Promise<string> {
  const encrypted = await bcrypt.hash(params, 10);
  return encrypted;
}
export async function compareText(text: string, hash: string) {
  const isMatch = await bcrypt.compare(text, hash);
  return isMatch;
}