const pantryModel = require("../models/pantryModel");
const basketModel = require("../models/basketModel");

const { isValidString,isValidRequestBody,isValidObjectId,isVaildEmail } = require("../validations/validator.js");

//making pantry
const createPantry = async function(req, res) {
  try {
    const requestBody = req.body;

    const { email, pantryName } = req.body;

    if (!isValidRequestBody(requestBody)) return res.status(400).send({status: false, message: "Empty request body. Please provide details" });

    if (!isValidString(pantryName)) return res.status(400).send({ status: false, message: "Please provide pantry name" });

    if (!isVaildEmail(email)) return res.status(400).send({ status: false, message: "Please provide valid email" });

    const pantry = await pantryModel.create(requestBody);

    return res.status(201).send({ status: true, message: "sucessfull", data: pantry._id });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//pantry details
const getPantry = async function(req, res) {
  try {
    const pId = req.params.pantryId;

    if (!isValidObjectId(pId)) return res.status(400).send({ status: false, message: 'Please provide valid pantry Id' });

    const baskets = await basketModel.find({ pantryId: pId }).select({ _id: 0, basketName: 1, ttl: 1 });

    const details = await pantryModel.findOne({ _id: pId });
//console.log(details)
// let data= { ...details.toObject() }
// console.log(data)
    return res.status(200).send({status: true,message: "pantry details",data: { details, baskets }});

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createPantry,
  getPantry
};
