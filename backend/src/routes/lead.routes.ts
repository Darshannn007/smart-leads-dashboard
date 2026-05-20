import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
