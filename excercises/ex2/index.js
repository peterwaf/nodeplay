import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true })); //should be below app

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/pages/home.html');
})

app.get('/about',(req,res)=>{
    res.sendFile(__dirname + '/public/pages/about.html');
})

app.post('/submit',(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const fullName = firstName + ' ' + lastName;
    res.send('Form Submitted the following name is ' + fullName);
})

app.get('/css/style.css',(req,res)=>{
    res.sendFile(__dirname + '/public/css/style.css');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})