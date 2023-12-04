import { randomBytes, scryptSync } from 'node:crypto';

export class AuthUtil {
  static hash(password: string): string {
    const salt = randomBytes(8).toString('hex');

    const derivedKey = scryptSync(password, salt, 64);

    return salt + ':' + derivedKey.toString('hex');
  }

  static verify(password: string, hash: string): boolean {
    if (!password || !hash) return false;

    const [salt, key] = hash.split(':');

    const derivedKey = scryptSync(password, salt, 64);

    return key === derivedKey.toString('hex');
  }
}
