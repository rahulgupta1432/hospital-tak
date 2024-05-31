const Hospital = require('../models/hospitalModel');
const Psychiatrist = require('../models/psychiatristModel');
const {Patient} = require('../models/patientModel');
const ErrorHandler = require('../utils/ErrorHandler');

exports.getHospitalDetails = async (req, res, next) => {
    try {
        const { hospitalId } = req.body;
        if(!hospitalId) return next(new ErrorHandler('Hospital ID is required', 400));

        const hospital = await Hospital.findOne({
            where: { id: hospitalId },
            include: [
                {
                    model: Psychiatrist,
                    as: 'psychiatrists',
                    include: [
                        {
                            model: Patient,
                            as: 'patients',
                            attributes: ['id']
                        }
                    ]
                }
            ]
        });

        if (!hospital) {
            return next(new ErrorHandler('Hospital not found', 404));
        }

        const psychiatristDetails = hospital.psychiatrists.map(psychiatrist => ({
            id: psychiatrist.id,
            name: psychiatrist.name,
            patientsCount: psychiatrist.patients.length
        }));

        const totalPatientsCount = hospital.psychiatrists.reduce((total, psychiatrist) => total + psychiatrist.patients.length, 0);

        return res.status(200).json({
            hospitalName: hospital.name,
            totalPsychiatristCount: hospital.psychiatrists.length,
            totalPatientsCount,
            psychiatristDetails
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
};