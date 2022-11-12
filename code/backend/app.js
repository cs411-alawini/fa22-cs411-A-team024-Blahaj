require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require("./routes/user.js");
const hospitalRouter = require("./routes/hospital.js");
const doctorRouter = require("./routes/doctor.js");
const universityRouter = require("./routes/university.js");
//const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());



app.use("/api/users",express.json(),userRouter);
app.use("/api/hospital",express.json(),hospitalRouter);
app.use("/api/doctor",express.json(),doctorRouter);
app.use("/api/univ",express.json(),universityRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
