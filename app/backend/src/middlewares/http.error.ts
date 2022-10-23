import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/http.exception';

const httpError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
};

export default httpError;
