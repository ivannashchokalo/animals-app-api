import createHttpError from "http-errors";
import { Animal } from "../models/animals.js";

export const getAnimals = async (req, res) => {
  const { page = 1, perPage = 10, type, status, search } = req.query;

  const skip = (page - 1) * perPage;

  const animalsQuery = Animal.find();

  if (type) {
    animalsQuery.where("type").equals(type);
  }

  if (status) {
    animalsQuery.where("status").equals(status);
  }

  if (search) {
    animalsQuery.where({ $text: { $search: search } });
  }

  const [totalItems, animals] = await Promise.all([
    animalsQuery.clone().countDocuments(),
    animalsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    animals,
  });
};

export const getAnimalById = async (req, res) => {
  const { animalId } = req.params;
  const animal = await Animal.findById(animalId);

  if (!animal) {
    throw createHttpError(404, "Animal not found");
  }

  res.status(200).json(animal);
};

export const createAnimal = async (req, res) => {
  const animal = await Animal.create(req.body);
  res.status(201).json(animal);
};

export const deleteAnimal = async (req, res) => {
  const { animalId } = req.params;

  const animal = await Animal.findByIdAndDelete(animalId);

  if (!animal) {
    throw createHttpError(404, "Animal not found");
  }

  res.status(200).json(animal);
};

export const updateAnimal = async (req, res) => {
  const { animalId } = req.params;
  const animal = await Animal.findByIdAndUpdate(animalId, req.body, {
    new: true,
  });

  if (!animal) {
    throw createHttpError(404, "animal not found");
  }

  res.status(200).json(animal);
};
