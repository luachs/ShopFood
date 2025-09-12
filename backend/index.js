const port = 4000;
const app = require("./src/app");

app.listen(port, (error) => {
  if (!error) {
    console.log(`🚀 Server is running at http//localhost:${port}`);
  } else {
    console.error("❌ Error: " + error);
  }
});
