import express from "express";
import VoiceRoutes from "@routes/ir";

const router = express.Router();
router.use(VoiceRoutes);

export default router;
