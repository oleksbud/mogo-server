import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/check', (req: Request, res: Response) => {
    const response = { result: 'ok'};
    res.send(response)
});

export default router;
