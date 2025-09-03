// import { createProxyMiddleware } from "http-proxy-middleware";
// import dotenv from "dotenv";
// dotenv.config();

// export default function (app) {
//   console.log("Proxy setup running...");
//   console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
//       changeOrigin: true,
//     })
//   );
// }
