import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    const result = await bcrypt.compare(password, hashedPassword);

    return result;
}