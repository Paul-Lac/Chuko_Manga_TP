const request = require("supertest");
const app = require("../../src/app");
const models = require("../../src/modelsProviders");

describe("GET /users/:id", () => {
  let testUser;
  let insertId;

  beforeAll(async () => {
    // Créer un utilisateur de test
    testUser = {
      firstname: "Sample",
      lastname: "User",
      pseudo: "sampleuser",
      email: "sampleuser@example.com",
      phone: "1234567890",
      picture: "sample.jpg",
    };

    // Insérer l'utilisateur de test dans la base de données
    insertId = await models.user.createUser(testUser);
  });

  it("should fetch a single user successfully", async () => {
    // Envoyer une requête GET à l'endpoint /users/:id
    const response = await request(app).get(`/users/${insertId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(insertId);
    expect(response.body.firstname).toBe(testUser.firstname);
    expect(response.body.lastname).toBe(testUser.lastname);
    expect(response.body.pseudo).toBe(testUser.pseudo);
    expect(response.body.email).toBe(testUser.email);
    expect(response.body.phone).toBe(testUser.phone);
    expect(response.body.picture).toBe(testUser.picture);
  });

  it("should return 404 for non-existent user", async () => {
    // Envoyer une requête GET à l'endpoint /users/:id avec un ID invalide
    const response = await request(app).get("/users/0");

    // Assertions
    expect(response.status).toBe(404);
  });
});
