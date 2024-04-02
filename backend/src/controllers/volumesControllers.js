const models = require("../modelsProviders");

const getVolumesByMangaId = async (req, res) => {
  try {
    // Supposons que vous passiez l'ID du manga via les paramètres de l'URL, par exemple /api/volumes/:mangaId
    const { mangaId } = req.params;

    const volumes = await models.volume.getVolumesByMangaId(
      parseInt(mangaId, 10)
    );
    if (!volumes || volumes.length === 0) {
      return res.sendStatus(404);
    }
    return res.json(volumes);
  } catch (err) {
    console.error("Erreur lors de la récupération des volumes : ", err);
    return res
      .status(500)
      .send("Internal Server Error - Unable to retrieve volumes");
  }
};

module.exports = {
  getVolumesByMangaId,
};
