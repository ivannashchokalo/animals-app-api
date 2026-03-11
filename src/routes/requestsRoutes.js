import { Router } from "express";
import {
  deleteRequest,
  getRequests,
  updateRequest,
} from "../controllers/requestsController.js";

const router = Router();

router.get("/", getRequests);
router.patch("/:reqId", updateRequest);
router.delete("/:reqId", deleteRequest);

export default router;
