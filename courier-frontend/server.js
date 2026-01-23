// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const app = express();
// const PORT = 5000;

// // Enable cors
// app.use(cors({ origin: "http://localhost:5173" }));

// if (!process.env.OLA_API_KEY) {
//   console.error("OLA_MAPS_API_KEY is missing");
//   process.exit(1);
// }

// app.get("/api/olamaps/autocomplete", async (req, res) => {
//   const { input } = req.query;

//   if (!input || input.trim().length < 1) {
//     return res.status(400).json({ error: "Query param 'input' is required" });
//   }

//   try {
//     const olaResponse = await axios.get(
//       "https://api.olamaps.io/places/v1/autocomplete",
//       {
//         params: {
//           input: input,
//         },
//         headers: {
//           "X-API-Key": process.env.OLA_API_KEY,
//           Accept: "application/json",
//         },
//         // Important: prevents axios from throwing for non-200 responses
//         validateStatus: () => true,
//       }
//     );

//     res.status(olaResponse.status).send(olaResponse.data);
//   } catch (error) {
//     console.error("Ola Maps API call failed:", error.message);
//     res.status(500).json({ error: "Failed to call Ola Maps API" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
