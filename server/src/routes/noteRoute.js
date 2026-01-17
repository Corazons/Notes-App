import express from "express"
import mongoose from "mongoose";

// >>
async function checkCollections() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("DB:", mongoose.connection.name);

  const cols = await mongoose.connection.db.collections();
  console.log("Collections:");
  cols.forEach(c => console.log("-", c.collectionName));

  await mongoose.disconnect();
}

checkCollections();
// <<

const router = express.Router()

router.get('/',(req, res) => {
    res.send("<h1>HELLO WORLD</h1>")
    
    console.log('=== check collection ===')
})

router.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

router.get('/api/notes', (req,res) => {
    console.log("Hellow")
})

router.post('/api/notes', (req, res) => {
    const body = req.body
    console.log(body)
    res.status(201).json(body)
})

export default router