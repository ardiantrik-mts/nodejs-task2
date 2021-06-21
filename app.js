const express = require('express')

const app = express();
app.use(express.json());
const port = 3000

app.use((req, res, next) => {
    console.log("Method : "+req.method+" | URL: "+ req.originalUrl +" | Time : " + Date());
    next();
});

const usersRoute = require('./routes/user');
app.use('/user', usersRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('*', function(req, res){
    res.status(404).send({ "message" : "Data tidak ditemukan!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})