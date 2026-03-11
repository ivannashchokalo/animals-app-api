import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

export const getAnimalsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).default(10),
    type: Joi.string().allow("").valid("dog", "cat", "all").optional(),
    status: Joi.string()
      .allow("")
      .valid("available", "reserved", "sold")
      .optional(),
    search: Joi.string().trim().allow(""),
  }),
};

export const createAnimalsSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.base": "Name must be a string",
      "string.min": "Name should have at least 2 characters",
      "any.required": "Name is required",
    }),

    type: Joi.string().valid("dog", "cat").required().messages({
      "string.base": "Type must be a string",
      "any.only": "Type must be one of: dog or cat",
      "any.required": "Type is required",
    }),

    breed: Joi.string().min(2).required().messages({
      "string.base": "Breed must be a string",
      "string.min": "Breed should have at least 2 characters",
      "any.required": "Breed is required",
    }),

    sex: Joi.string().valid("male", "female").required().messages({
      "string.base": "Sex must be a string",
      "any.only": "Sex must be one of: dog or cat",
      "any.required": "Sex is required",
    }),

    birthDate: Joi.date().less("now").messages({
      "date.base": "Birth date must be a valid date",
      "date.less": "Birth date must be in the past",
    }),

    price: Joi.number().min(1).messages({
      "number.base": "Price must be a number",
      "number.min": "Price must be at least 1",
    }),

    status: Joi.string().valid("available", "reserved", "sold").messages({
      "string.base": "Status must be a string",
      "any.only": "Status must be one of: available, reserved, sold",
    }),

    description: Joi.string().allow("").messages({
      "string.base": "Description must be a string",
    }),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message("Invalid id format") : value;
};

export const animalIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    animalId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateAnimalSchema = {
  [Segments.PARAMS]: Joi.object({
    animalId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2),
    type: Joi.string().valid("dog", "cat"),
    breed: Joi.string().min(2),
    birthDate: Joi.date().less("now"),
    price: Joi.number().min(1),
    status: Joi.string().valid("available", "reserved", "sold"),
    description: Joi.string(),
  }).min(1),
};
