import dotenv from "dotenv"
import { NFTStorage, Blob } from "nft.storage"
import express from "express"
dotenv.config()

const app = express()
const port = process.env.PORT
const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN })

app.use(express.static("public"))
app.use(express.json())

app.post('/store-to-nft-storage', async function (req, res) {
  const cid = await client.storeBlob(new Blob(JSON.stringify(req.body)))
  res.send(cid);
});

app.listen(port, () => {
  console.log(`Borbus webshop listening on port ${port}`)
})
