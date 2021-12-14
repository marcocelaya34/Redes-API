const express = require("express");
const app = express();
let respCMD = "";
let userSSH = "";
let passwordSSH = "";
let addressSSH = "";
var cmdSSH = "";

app.set("port", 3000);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.post("/", (req, res) => {
  userSSH = req.body.user;
  passwordSSH = req.body.password;
  addressSSH = req.body.address;
  cmdSSH = req.body.cmd;

  var SSH = require("simple-ssh");

  var ssh = new SSH({
    host: addressSSH,
    user: userSSH,
    pass: passwordSSH,
  });

  ssh
    .exec(cmdSSH, {
      out: function (stdout) {
        console.log("Valor: " + stdout);
        res.send({ message: stdout });
      },
      err: function (stderr) {
        console.log("Errores" + stderr);
      },
      exit: function (code) {
        console.log("Codigo" + code);
      },
    })
    .start();
});

app.listen(app.get("port"),'0.0.0.0', () => {
  console.log(`Escuchando puerto ${app.get("port")}`);
});
