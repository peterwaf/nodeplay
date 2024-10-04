import { db } from "./config.js";
import { bucket } from "./config.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
const addBlog = async (title, body, featuredImage) => {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            title: title,
            body: body,
            featuredImage: featuredImage
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.log(error);
    }
}

const loadedBlogs = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogList = [];
        querySnapshot.forEach((doc) => {
            blogList.push(doc.data());
        });
        return blogList;     
    } catch (error) {
        console.log(error.message);
    }
}   

export { addBlog,loadedBlogs}