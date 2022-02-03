const express = require("express");
const mongoose = require('mongoose');
const { white, bold, italic } = require('colorette');
const contactRoute = require("./Routes/contactRoute");

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', contactRoute);
app.get('/', (req, res) => {
  res.json({
    "message": "Page rending"
  })
})
app.get('*', (req,res)=>{
  res.json({
    "message": "page not found!"
  })
})
const port = process.env.PORT || 8080;
mongoose.connect(`mongodb+srv://kbutsho40034:Kbutsho1234@cluster0.snrkw.mongodb.net/testDatabase?retryWrites=true&w=majority`,
 { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(white(bold(italic("Server is running successfully on PORT " + port))));
    })
  })
  .catch(error = () => {
    console.log(error);
  });

