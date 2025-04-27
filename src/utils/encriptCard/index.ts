"use server"

import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const ivLength = 16; // AES usa IV de 16 bytes

//FAZER UM GERADOR DE SALT

function deriveKey(salt: string): Buffer {
  return crypto.pbkdf2Sync(process.env.CHAVE_CRIPTO_CARD!, salt, 100000, 32, 'sha256');
}

export function encryptObject(obj: object, salt: string): string {
  const key = deriveKey(salt);
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const jsonData = JSON.stringify(obj);
  const encrypted = Buffer.concat([cipher.update(jsonData, 'utf8'), cipher.final()]);

  const result = {
    iv: iv.toString('hex'),
    data: encrypted.toString('hex')
  };

  return JSON.stringify(result); // Pode armazenar em banco ou arquivo
}

export function decryptObject(encryptedStr: string, salt: string): object {
  const encrypted = JSON.parse(encryptedStr);
  const key = deriveKey(salt);
  const iv = Buffer.from(encrypted.iv, 'hex');
  const data = Buffer.from(encrypted.data, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);

  return JSON.parse(decrypted.toString('utf8'));
}
