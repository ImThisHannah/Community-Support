import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.send(user);
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).send('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        const token = jwt.sign({ id: user.id },
            'secret', { expiresIn: '1d' });
        return res.send(token);
    }

    return res.status(401).send('Invalid password');
});

export default router;