import { Router } from "express";
export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
    res.json({ ok: true, uptime: process.uptime(), timeStamp: new Date().toISOString() })
});
