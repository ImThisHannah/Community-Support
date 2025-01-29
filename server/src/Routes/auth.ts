import express, { Request, Response } from 'express';
import bcrypt from 'bcriptjs';
import jwt from 'jsonwebtoken';
import { User } from '../Models/User';

const router = express.Router();

router.post('/register', asyync (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.send(user);
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: {username } });
    if (!user) {
        return res.status(404).send('User not found');
    } else {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            const token = jwt.sign({ id: user.id },
                'secret', { expiresIn: '1d' });
            res.send(token);
        } else {
            res.status(401).send('Invalid password');
        }
    }
});

export default router;