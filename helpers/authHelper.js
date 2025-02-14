import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds); // Return the hashed password
    } catch (error) {
        console.error(error);
        throw error; // Ensure the error is properly thrown
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword); // Use the correct variable
};
 