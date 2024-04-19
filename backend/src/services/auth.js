const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    // Extract password from req.body
    const { password } = req.body;
    // Hash password with defined options
    const hashedPassword = await argon2.hash(password, hashingOptions);
    // Add hashed password to req.body
    req.body.hashedPassword = hashedPassword;
    // Delete plainpassword
    delete req.body.password;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  hashPassword,
};

// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   try {
//     // Vérifier la présence de l'en-tête "Authorization" dans la requête
//     const authorizationHeader = req.get("Authorization");

//     if (authorizationHeader == null) {
//       throw new Error("Authorization header is missing");
//     }

//     // Vérifier que l'en-tête a la forme "Bearer <token>"
//     const [type, token] = authorizationHeader.split(" ");

//     if (type !== "Bearer") {
//       throw new Error("Authorization header has not the 'Bearer' type");
//     }

//     // Vérifier la validité du token (son authenticité et sa date d'expériation)
//     // En cas de succès, le payload est extrait et décodé
//     // TODO : faire un const avec resultat du jwt.verify (true/flase) si false : ne pas faire next() = envoyer erreur / si true : next()
//     req.auth = jwt.verify(token, process.env.APP_SECRET);

//     next();
//   } catch (err) {
//     console.error(err);

//     res.sendStatus(401);
//   }
// };

// module.exports = {
//   verifyToken,
// };
