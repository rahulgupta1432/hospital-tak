const express=require("express");
const { getHospitalDetails } = require("../controllers/hospitalController");

const router=express();

router.route("/hospital-details").get(getHospitalDetails);

module.exports=router;

