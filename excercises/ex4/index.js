import express from 'express';
import bodyParser from "body-parser";
import { db } from "./config.js";
import { collection,addDoc,getDocs, doc } from "firebase/firestore";
import { ref,uploadBytes, getDownloadURL } from "firebase/storage"; // for image storage upload
import { bucket } from "./config.js";
import multer from "multer"; // for file upload

const app = express();
const storage = multer.memoryStorage(); // for file upload
const upload = multer({ storage: storage}, { limits: { fileSize: 5 * 1024 * 1024 } });

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

app.get('/blog', async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogs = [];
    querySnapshot.forEach((doc) => {
        blogs.push(doc.data());
    });
    res.render('pages/blog.ejs', { blogs: blogs }); // blog route
});

app.get('/add', (req, res) => {
    res.render('pages/add.ejs'); // add route
});

app.post('/add',upload.single('image'),async (req,res)=>{
    const {title,content} = req.body; // for form data
    const image = req.file; // for image file upload
    
    try {
        //add image file to firebase storage
        const imageRef = ref(bucket, `photos/${image.originalname}`);
        await uploadBytes(imageRef, image.buffer, { contentType: image.mimetype }); // for image file upload
        const imageUrl = await getDownloadURL(imageRef);
        await addDoc(collection(db, "blogs"), {
            id : crypto.randomUUID(),
            title: title,
            content: content,
            imageUrl: imageUrl
        })
        res.redirect('/blog');
    } catch (error) {
        res.status(500).send(`Error submitting blog: ${error.message}`);
    }
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});