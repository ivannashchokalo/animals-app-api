import { Router } from "express";
import {
  createAnimal,
  deleteAnimal,
  getAnimalById,
  getAnimals,
  updateAnimal,
} from "../controllers/animalsController.js";
import { celebrate } from "celebrate";
import {
  animalIdParamSchema,
  createAnimalsSchema,
  getAnimalsSchema,
  updateAnimalSchema,
} from "../validations/animalsValidation.js";

const router = Router();

router.get("/", celebrate(getAnimalsSchema), getAnimals);
router.get("/:animalId", celebrate(animalIdParamSchema), getAnimalById);
router.post("/", celebrate(createAnimalsSchema), createAnimal);
router.delete("/:animalId", celebrate(animalIdParamSchema), deleteAnimal);
router.patch("/:animalId", celebrate(updateAnimalSchema), updateAnimal);

export default router;
