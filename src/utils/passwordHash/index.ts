import argon2 from "argon2";

export async function hashPassword(password: string) {
    try {
        const hash = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 4,
        });
        return hash;
    } catch (err) {
        console.error('Erro ao hashear a senha:', err);
    }
}

export async function verifyPassword(password: string, hash: string) {
    try {
        const match = await argon2.verify(hash, password);
        if(match) return match;
        return false;
    } catch (err) {
        console.error('Erro ao verificar a senha:', err);
    }
}