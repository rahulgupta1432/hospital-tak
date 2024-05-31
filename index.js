const express=require("express");
const app=express();
const port=5000;
const patientRoutes=require("./routes/patientRoutes.js");
const hospitalRoutes = require('./routes/hospitalRoutes');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/patient",patientRoutes);
app.use('/api/v1/hospital', hospitalRoutes);


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        status: "failure",
        code: err.statusCode,
        message: err.message,
        data: []
    });
});



app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});