import {Request, Response} from 'express';

const check = (req: Request, res: Response) => {
    const response = { result: 'ok'};
    res.send(response)
};

export default check;
