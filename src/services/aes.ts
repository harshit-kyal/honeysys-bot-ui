import CryptoJS from "crypto-js";
import { environment } from "../environments/environment";

const secretKey = environment.AESSecret; // Parse the secret key

export function encrypt(value: string): string {
  return CryptoJS.AES.encrypt(value, secretKey.trim()).toString();
}

export function decrypt(textToDecrypt: string) {
  return CryptoJS.AES.decrypt(textToDecrypt, secretKey.trim()).toString(
    CryptoJS.enc.Utf8
  );
}
