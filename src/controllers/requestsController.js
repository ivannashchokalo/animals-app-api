import createHttpError from "http-errors";
import { Animal } from "../models/animals.js";
import { Request } from "../models/requests.js";

export const getRequests = async (req, res) => {
  const requests = await Request.find();

  res.status(200).json(requests);
};

export const updateRequest = async (req, res) => {
  const { reqId } = req.params;
  const request = await Request.findByIdAndUpdate({ _id: reqId }, req.body, {
    new: true,
  });

  if (!request) {
    throw createHttpError(404, "Request not found");
  }

  res.status(200).json(request);
};

export const deleteRequest = async (req, res) => {
  const { reqId } = req.params;

  const request = await Request.findByIdAndDelete({ _id: reqId });

  if (!request) {
    throw createHttpError(404, "Request not found");
  }

  res.status(200).json(request);
};
