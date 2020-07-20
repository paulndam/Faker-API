const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());

// In order to be able to access POST data, we need to be able to pull it out of the request object. To do this, we first have to add a new setting to our server.js file:
// express.json and express.urlencoded are bot responsible in providing and parsing the request.body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// req is short for request
// res is short for response
app.get("/api", (req, res) => {
  res.send("Our express api server is now sending this over to the browser");
});
// by invoking app.get, we're saying we want to handle GET requests at this particular route ("/api"). The second argument passed to the get method is the callback function we want to run when a browser makes a request to this route.

//rooute to test if things are working
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello Rico and Tito" });
});

const players = [
  { firstname: "marcus", lastname: "rashford" },
  { firstname: "antoine", lastname: "martial" },
  { firstname: "bruno", lastname: "fernandes" },
];

const teams = {
  names: ["manchester united", "Fc porto", "AS monaco"],
  leagues: ["english premiere league", "portuguese league", "la league un"],
};

//if user wants to get or request info about the player

app.get("/api/players", (req, res) => {
  res.json(players);
});

app.get("/api/teams", (req, res) => {
  res.json(teams);
});

app.get("/api/teams/players", (req, res) => {
  res.json(teams, players);
});

app.get("/api/players/teams", (req, res) => {
  res.json(players, teams);
});
app.get;

// can  also pass params and as well as if i want to include id in the route, do this below

app.get("/api/players/:id", (req, res) => {
  //we can see the id variable from req.params
  console.log(req.params);
  //we can then return one user with their own id this way
  res.json(players[req.params.id]);
});

app.get("/api/teams/:id", (req, res) => {
  //we can see the id variable from req.params
  console.log(req.params);
  //we can then return one user with their own id this way
  res.json(teams[req.params.id]);
});
// now we can get information from a form by doing this

app.post("/api/players", (req, res) => {
  //req.body contains the form data from postman or react
  console.log(req.body);
  //can also be pushed into the player array
  //later on we can now insert it into database
  players.push(req.body);
  res.json({ status: "ok rico in here !!" });
});

//to update do this

app.put("/api/players/:id", (req, res) => {
  // we can get this `id` variable from req.params
  const id = req.params.id; // assuming this id is the index of the users array we can replace the user like so
  players[id] = req.body; // we always need to respond with something
  res.json({ status: "ok" });
});

//to delete

app.delete("/api/players/:id", (req, res) => {
  // we can get this `id` variable from req.params
  const id = req.params.id;
  // assuming this id is the index of the users array we can remove the user like so
  players.splice(id, 1);
  // we always need to respond with something
  res.json({ status: "ok" });
});

const server = app.listen(8000, () =>
  console.log(`Server is locked and loaded on port ${server.address().port}!`)
);
