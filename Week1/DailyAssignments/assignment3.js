const express = require("express");
const users = require("./data.json");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));
app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>`;
  return res.send(html);
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./data.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});
app.listen(8000, () => console.log("Server Started!!"));
