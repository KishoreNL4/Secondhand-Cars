import express from "express";
// import { petBrand } from "../controllers/petBrand.js";
import { carBrand } from "../controllers/carBrand.js";
const router = express.Router();

router.get("/carBrand/:brand", carBrand);

export default router;
