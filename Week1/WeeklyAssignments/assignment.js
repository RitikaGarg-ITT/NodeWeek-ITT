const express = require("express");
const fs = require("fs");

const app = express();
const port = 8000;

app.get("/", async (req, res) => {
  try {
    const data = await fs.promises.readFile("users.json", { encoding: "utf8" });
    const jsonData = JSON.parse(data);

    const processedData = jsonData.users.map((user) => ({
      id: user.id,
      name: user.name.toUpperCase(),
      email: user.email.toLowerCase(),
    }));
    res.json(processedData);
  } catch (error) {
    console.error("Error occurred:", error);
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
