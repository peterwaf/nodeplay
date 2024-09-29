import express from "express";
import bodyParser from "body-parser";
const app = express();
app.set("view engine", "ejs");
app.use(express.static('public')); // for serving static files
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded



app.get("/", (req, res) => {
    res.render("pages/home"); // Corrected path
});

app.get("/about", (req, res) => {
    res.render("pages/about"); // Corrected path
})

app.get("/contact", (req, res) => {
    res.render("pages/contact"); // Corrected path
})

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
