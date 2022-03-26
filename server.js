let projectData = {};

const e = require('express');
const express = require('express');

const app = express();
const port = 8081;

//body-parser for json files.. middle-ware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static("website"));

const cors = require('cors');

app.use(cors());

app.post("/add", async function (req, res){
  const body = await req.body;
  projectData = body;
  console.log(projectData);
  res.status(200).send(projectData);
});

app.get("/all", async (_req, res) => {
  res.send(projectData);
});

app.listen(port, function()
{console.log('listening on port' + port); 
});
 