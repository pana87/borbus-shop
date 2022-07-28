import fs from "fs"
import { createCollectionOne } from "./create-collection-one.mjs"

import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  const collectionOne = await createCollectionOne()

  try {
    fs.writeFileSync(`${__dirname}/../_data/collection-one.json`, JSON.stringify(collectionOne))
  } catch (error) {
    console.error(error)
    return
  }
}
main()
