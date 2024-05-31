const express=require("express");
const { createPatient } = require("../controllers/patientController");
const {upload}  = require("../utils/uploadFile");
const router=express();

router.route("/create-patient").post(upload.single("patientPicture"), createPatient);
// router.route("/create-patient").post(createPatient);
module.exports=router;

