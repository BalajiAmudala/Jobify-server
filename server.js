import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
//routers
import jobRouter from "./routes/jobRouter.js";
let jobs = [
  {
    id: nanoid(),
    company: "apple",
    position: "front-end",
  },
  {
    id: nanoid(),
    company: "google",
    position: "back-end",
  },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

// //GET ALL JOBS
// app.get("/api/v1/jobs");

// //CREATE JOB
// app.post("/api/v1/jobs");

// //GET SINGLE JOB
// app.get("/api/v1/jobs/:id");

// //EDIT JOB
// app.patch("/api/v1/jobs/:id");

// //DELETE JOB
// app.delete("/api/v1/jobs/:id");

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found!" });
});

//error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong!!" });
});

const port = process.env.PORT || 5100;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
startServer();

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(port, () => {
//       console.log(`server running on ${port}...`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed:", err);
//     process.exit(1);
//   });

// app.listen(port, () => {
//   console.log(`server running on ${port}...`);
// });
