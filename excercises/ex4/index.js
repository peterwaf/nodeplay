import express from 'express';
import bodyParser from "body-parser";

const app = express();

//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
    res.render('pages/home.ejs'); // home route
});

app.get('/about', (req, res) => {
    res.render('pages/about.ejs'); // about route
});

app.get('/contact', (req, res) => {
    res.render('pages/contact.ejs'); // contact route
});

app.get('/blog', (req, res) => {
    res.render('pages/blog.ejs'); // blog route
});

app.get('/add', (req, res) => {
    res.render('pages/add.ejs'); // add route
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});