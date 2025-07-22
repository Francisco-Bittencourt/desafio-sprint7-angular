const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

app.get("/", (req, res) => {
  res.send("Sua API está no ar! Use as rotas /login, /vehicles ou /vehicleData.");
});

app.post("/login", async (req, res, next) => {
  try {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      throw new ApiError("O campo de usuário ou senha não foi preenchido!", 400);
    }

    if (nome !== "admin" || senha !== "123456") {
      throw new ApiError("O nome de usuário ou senha está incorreto ou não foi cadastrado!", 401);
    }

    return res.status(200).json({
      id: 1,
      nome: "admin",
      email: "admin@email.com",
    });
  } catch (error) {
    next(error);
  }
});

app.get("/vehicles", (req, res, next) => {
  try {
    const vehicles = [
      {
        id: 1,
        vehicle: "Ranger",
        volumetotal: 145760,
        connected: 70000,
        softwareUpdates: 27550,
        img: "/img/ranger.png",
      },
      {
        id: 2,
        vehicle: "Mustang",
        volumetotal: 1500,
        connected: 500,
        softwareUpdates: 750,
        img: "/img/mustang.png",
      },
      {
        id: 3,
        vehicle: "Territory",
        volumetotal: 4560,
        connected: 4000,
        softwareUpdates: 3050,
        img: "/img/territory.png",
      },
      {
        id: 4,
        vehicle: "Bronco Sport",
        volumetotal: 7560,
        connected: 4060,
        softwareUpdates: 2050,
        img: "/img/broncoSport.png",
      },
    ];

    return res.status(200).json({ vehicles });
  } catch (error) {
    next(error);
  }
});

app.post("/vehicleData", (req, res, next) => {
  try {
    const { vin } = req.body;

    const data = {
      "2FRHDUYS2Y63NHD22454": {
        id: 1, odometro: 23344, nivelCombustivel: 76, status: "on", lat: -12.2322, long: -35.2314,
      },
      "2RFAASDY54E4HDU34874": {
        id: 2, odometro: 130000, nivelCombustivel: 19, status: "off", lat: -12.2322, long: -35.2314,
      },
      "2FRHDUYS2Y63NHD22455": {
        id: 3, odometro: 50000, nivelCombustivel: 90, status: "on", lat: -12.2322, long: -35.2314,
      },
      "2RFAASDY54E4HDU34875": {
        id: 4, odometro: 10000, nivelCombustivel: 25, status: "off", lat: -12.2322, long: -35.2314,
      },
      "2FRHDUYS2Y63NHD22654": {
        id: 5, odometro: 23544, nivelCombustivel: 76, status: "on", lat: -12.2322, long: -35.2314,
      },
      "2FRHDUYS2Y63NHD22854": {
        id: 6, odometro: 23574, nivelCombustivel: 76, status: "on", lat: -12.2322, long: -35.2314,
      }
    };

    if (!data[vin]) throw new ApiError("Código VIN utilizado não foi encontrado!", 400);

    return res.status(200).json(data[vin]);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Falha na comunicação com o servidor!";

  console.error(err);
  res.status(statusCode).json({ message });
});

// ✅ Exporta como função para o Vercel
module.exports = app;
