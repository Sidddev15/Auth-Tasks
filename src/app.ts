import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { healthRouter } from './routes/health';

dotenv.config();

export function createServer() {
    const app = express();

    // Core middlewares
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    //Routes
    app.use('/health', healthRouter);
    app.get('/', (_req, res) => {
        res.json({ ok: true, message: 'API is running' });
    });

    //404
    app.use((_req, res) => res.status(404).json({ ok: false, error: "Not Found" }));

    // Global Error Handler
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error(err);
        res.status(500).json({ ok: false, error: "Internal Server Error" });
    });

    return app;
}
