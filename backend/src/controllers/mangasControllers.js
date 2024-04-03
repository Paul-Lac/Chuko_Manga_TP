const models = require("../modelsProviders");

const getMangas = async (req, res) => {
  try {
    const userQuery = req.query.q;
    if (userQuery) {
      // get Manga if user provided data in search input
      const manga = await models.manga.getMangaQuery(userQuery);
      if (manga) {
        res.json(manga);
        console.info("Voici l'entrée utilisateur:", userQuery);
      } else {
        res.sendStatus(404);
      }
    } else {
      // get Manga without any search input
      const allMangas = await models.manga.getMangaData();
      res.json(allMangas);
      console.info("pas d'entrée");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMangaById = async (req, res) => {
  try {
    const manga = await models.manga.findOne(req.params.id);
    if (manga == null) {
      res.sendStatus(404);
    } else {
      res.json(manga);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getCatalogMangas = async (req, res) => {
  try {
    const manga = await models.manga.findOverview();
    console.info("Resultat envoyés au client :", manga);
    if (!manga || manga.length === 0) {
      return res.status(404).send("Aucun manga trouvé.");
    }
    return res.json(manga);
  } catch (err) {
    console.error("Erreur lors de la récupération des mangas : ", err);
    return res
      .status(500)
      .send(
        "Internal Server Error - Unable to retrieve mangas basic information"
      );
  }
};

const deleteManga = async (req, res) => {
  try {
    const manga = await models.manga.deleteManga(req.params.id);
    if (manga === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// const getMangaQuery = async (req, res) => {
//   try {
//     const userQuery = req.query.q;
//     console.info(`Controller Search query: ${userQuery}`);
//     const manga = await models.manga.getMangaOverview();
//     if (manga != null) {
//       res.json(manga);
//       console.info(manga);
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

module.exports = {
  getMangas,
  getMangaById,
  getCatalogMangas,
  deleteManga,
  // getMangaQuery,
};
