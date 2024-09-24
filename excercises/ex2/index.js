import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/pages/home.html');
})

app.get('/about',(req,res)=>{
    res.sendFile(__dirname + '/public/pages/about.html');
})

app.get('/css/style.css',(req,res)=>{
    res.sendFile(__dirname + '/public/css/style.css');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})