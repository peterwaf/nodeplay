import express from "express";
// import bodyParser from "body-parser";
import multer from "multer";
import { addBlog } from "./mods/scripts/firebaselogic.js";
import { bucket } from "./mods/scripts/config.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { loadedBlogs } from "./mods/scripts/firebaselogic.js";
const app = express();
app.set("view engine", "ejs");
app.use(express.static('public')); // for serving static files
// app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
//form validation
import { body, validationResult } from 'express-validator';
app.use(express.json());
//check if errors are added
let isError = false;
let isMissingFile = false;
app.get("/", (req, res) => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis voluptatum adipisci laborum, assumenda veniam laudantium voluptate harum, tenetur quod sit ducimus id facilis. Voluptas, quae velit? Unde esse perferendis sapiente!";
    res.render("pages/home", { lorem: lorem });
});

app.get("/about", (req, res) => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis voluptatum adipisci laborum, assumenda veniam laudantium voluptate harum, tenetur quod sit ducimus id facilis. Voluptas, quae velit? Unde esse perferendis sapiente!";
    res.render("pages/about", { lorem: lorem });
})

app.get("/contact", (req, res) => {
    res.render("pages/contact");
})

app.get("/blog", async (req, res) => {
    const blogs = await loadedBlogs();
    if(!blogs){
        res.status(500).render("pages/error",{message:"Something went wrong, try again later"});
    }
    res.render("pages/blog", { blogs: blogs });
})

app.get("/add-blog", (req, res) => {
    if (!isError) {
        res.render("pages/add",{isError:isError, isMissingFile:isMissingFile});
    }
})

//validate form first
const validateForm = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('body')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),
];

app.post("/add-blog", upload.single('featuredImage'), validateForm, async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        isError = true;
        res.render("pages/add", { errors: errors.array(),isError: isError});

    }

    if (!req.file) {
        isMissingFile = true;
        const missingFileMessage = 'Missing featured image';
        console.log(missingFileMessage);
        res.render("pages/add", { errors: errors.array(),isError: isError, isMissingFile: isMissingFile,missingFileMessage: missingFileMessage });
    }

    if (!errors.isEmpty() || req.file) {
        isMissingFile = false;
        isError = true;
        const missingFileMessage = '';
        res.render("pages/add", { errors: errors.array(),isError: isError, isMissingFile: isMissingFile,missingFileMessage: missingFileMessage });
    }
    
    try {
        const title = req.body.title;
        const body = req.body.body;
        const featuredImage = req.file;
        if (featuredImage) {
            const randomImgId = crypto.randomUUID();
            const storageRef = ref(bucket, `images/${randomImgId}${featuredImage.originalname}`);
            await uploadBytes(storageRef, featuredImage.buffer, {
                contentType: featuredImage.mimetype // 'image/png..display image contents',
            }).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);
                    addBlog(title, body, url);
                })
            })

            res.render("pages/success");
        }
    } catch (error) {
        console.log(error);
    }
})
app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});



