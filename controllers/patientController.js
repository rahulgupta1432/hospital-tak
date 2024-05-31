const Hospital = require("../models/hospitalModel.js");
const {Patient}=require("../models/patientModel.js");
const {validatePatientInfo}=require("../models/patientModel.js")
const Psychiatrist = require("../models/psychiatristModel.js");
const ErrorHandler=require("../utils/ErrorHandler.js");
const { uploadToCloudinary, generateHashedFileName } = require("../utils/uploadFile.js");

exports.createPatient = async (req, res, next) => {
    try {
        const { name, address, email, phoneNumber, password, hospitalId, psychiatristId } = req.body;
        const valid = await validatePatientInfo(req.body);
        if (!valid || (valid && valid.error)) {
            return next(new ErrorHandler(valid.error, 400));
        }

        let uploadedFile = null;
        const file = req.file;
        if (file) {
            const hashedName = generateHashedFileName(file.originalname, Date.now());
            uploadedFile = await uploadToCloudinary(file, hashedName);
        }

        const hospitalExists = await Hospital.findByPk(hospitalId);
        if (!hospitalExists) {
            return next(new ErrorHandler('Hospital with the provided ID does not exist', 400));
        }

        // Check if the provided psychiatristId exists
        const psychiatristExists = await Psychiatrist.findByPk(psychiatristId);
        if (!psychiatristExists) {
            return next(new ErrorHandler('Psychiatrist with the provided ID does not exist', 400));
        }

        let patient = await Patient.create({
            name,
            address,
            email,
            phoneNumber,
            password,
            patientPicture: uploadedFile,
            hospitalId,
            psychiatristId
        });
        
        patient.password = undefined;
        return res.status(200).json({
            status: "success",
            code: 200,
            message: "Patient Registered successfully",
            data: patient
        });
    } catch (error) {
        console.log("error", error);
        return next(new ErrorHandler(error.message, 500));
    }
};
