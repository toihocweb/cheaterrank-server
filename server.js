const bodyParser = require("body-parser");
const cors = require("cors");
const execSync = require("child_process").execSync;
const express = require("express");
const fs = require("fs");
const path = require("path");
const postQuestion = require("./route/api/question");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CODE_FOLDER = "code";

function testCode(req, res) {
  let code = req.body["code"];
  let inputs = req.body.inputs;
  let outputs = req.body.outputs;
  console.log(req.body.inputs);
  let final_code = `
  module.exports = (input) => {
      ${code}
    }
  `;

  let cases = `
  module.exports = {
    inputs: ${inputs},
    outputs: ${outputs},
    }
  `;

  try {
    fs.writeFileSync(
      path.join(__dirname, CODE_FOLDER, "input_code.js"),
      final_code
    );

    fs.writeFileSync(path.join(__dirname, CODE_FOLDER, "cases.js"), cases);
    const proc = execSync("node " + path.join(CODE_FOLDER, "tests.js"));
    const results = proc.toString();
    return res.send(results);
  } catch (error) {
    const regex = /(TypeError|ReferenceError|SyntaxError).*/gm;
    const str = `${error.toString()}`;
    return res.send(regex.exec(str)[0]);
  }
}

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/test/", testCode);

app.post("/question", postQuestion);

app.listen(5000, () => console.log(`Listening on port 5000.`));
