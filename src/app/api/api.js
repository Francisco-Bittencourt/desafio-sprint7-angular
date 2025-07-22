// Importa os módulos necessários
const express = require("express");
const path = require("path");
const cors = require("cors");

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para permitir requisições de diferentes origens (CORS)
// Ao usar `cors()` sem opções, ele permite todas as origens, o que é útil para APIs públicas
// Em produção, você pode querer restringir isso a domínios específicos.
app.use(cors());

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Middleware para servir arquivos estáticos.
// Isso significa que qualquer arquivo na pasta onde o script está rodando (e suas subpastas)
// pode ser acessado diretamente via URL.
// Por exemplo, se você tiver uma pasta 'img' com 'ranger.png' dentro,
// ele será acessível em '/img/ranger.png'
app.use(express.static(path.join(__dirname)));


// Rota principal da API
app.get("/", (req, res) => {
  res.send("Sua API está no ar! Use as rotas /login, /vehicles ou /vehicleData.");
});


// Rota para autenticação de login
app.post("/login", async (req, res) => {
  try {
    const { nome, senha } = req.body;

    // Valida se os campos de nome e senha foram preenchidos
    if (!nome || !senha) {
      return res.status(400).json({
        message: "O campo de usuário ou senha não foi preenchido!",
      });
    }

    // Valida as credenciais (exemplo simples, em produção usaria um banco de dados)
    if (nome !== "admin" || senha !== "123456") {
      return res.status(401).json({
        message: "O nome de usuário ou senha está incorreto ou não foi cadastrado!",
      });
    }

    // Retorna os dados do usuário em caso de sucesso
    return res.status(200).json({
      id: 1,
      nome: "admin",
      email: "admin@email.com",
    });
  } catch (error) {
    // Captura e retorna erros do servidor
    return res.status(500).json({
      message: "Falha na comunicação com o servidor!",
      error: String(error),
    });
  }
});

// Rota para obter a lista de veículos
app.get("/vehicles", (req, res) => {
  try {
    const vehicles = [
      {
        id: 1,
        vehicle: "Ranger",
        volumetotal: 145760,
        connected: 70000,
        softwareUpdates: 27550,
        // CORREÇÃO: Usando caminho relativo para a imagem.
        // Isso assume que a pasta 'img' está no mesmo nível do seu arquivo de API
        // e foi implantada na Vercel.
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

    // Retorna a lista de veículos
    return res.status(200).json({ vehicles });
  } catch (error) {
    // Captura e retorna erros do servidor
    return res.status(500).json({
      message: "Falha na comunicação com o servidor!",
    });
  }
});

// Rota para obter dados de um veículo específico pelo VIN
app.post("/vehicleData", (req, res) => {
  try {
    const { vin } = req.body;

    // Lógica para retornar dados baseados no VIN fornecido
    switch (vin) {
      case "2FRHDUYS2Y63NHD22454":
        return res.status(200).json({
          id: 1,
          odometro: 23344,
          nivelCombustivel: 76,
          status: "on",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2RFAASDY54E4HDU34874":
        return res.status(200).json({
          id: 2,
          odometro: 130000,
          nivelCombustivel: 19,
          status: "off",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2FRHDUYS2Y63NHD22455":
        return res.status(200).json({
          id: 3,
          odometro: 50000,
          nivelCombustivel: 90,
          status: "on",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2RFAASDY54E4HDU34875":
        return res.status(200).json({
          id: 4,
          odometro: 10000,
          nivelCombustivel: 25,
          status: "off",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2FRHDUYS2Y63NHD22654":
        return res.status(200).json({
          id: 5,
          odometro: 23544,
          nivelCombustivel: 76,
          status: "on",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2FRHDUYS2Y63NHD22854":
        return res.status(200).json({
          id: 6,
          odometro: 23574,
          nivelCombustivel: 76,
          status: "on",
          lat: -12.2322,
          long: -35.2314,
        });

      default:
        // Retorna erro se o VIN não for encontrado
        return res.status(400).json({
          message: "Código VIN utilizado não foi encontrado!",
        });
    }
  } catch (error) {
    // Captura e retorna erros do servidor
    return res.status(500).json({
      message: "Falha na comunicação com o servidor!",
    });
  }
});

// Define a porta em que a API vai escutar.
// Usa process.env.PORT para ambientes de produção (como Vercel)
// e 3001 como fallback para desenvolvimento local.
const PORT = process.env.PORT || 3001;

// Inicia o servidor Express
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}/`);
  // Em produção, o console.log pode não ser visível diretamente,
  // mas ajuda no desenvolvimento local.
});
