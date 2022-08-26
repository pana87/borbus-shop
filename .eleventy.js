const fs = require("fs")

module.exports = function(eleventyConfig) {

  eleventyConfig.on("eleventy.before", () => {
    const agbsPath = "./static/allgemeine-geschaftsbedingungen-767-all-breakpoints.html"
    const bestellformularPath = "./static/bestellformular-all-breakpoints.html"
    const bestellubersichtPath = "./static/bestellubersicht-1200-all-breakpoints.html"
    const dankePath = "./static/dankeseite-375-all-breakpoints.html"
    const datenschutzPath = "./static/datenschutzerklaerung-1200-all-breakpoints.html"
    const fehlgeschlagenPath = "./static/fehlgeschlagen-375-all-breakpoints.html"
    const groessentabellePath = "./static/groessentabelle-all-breakpoints.html"
    const impressumPath = "./static/impressum-1200-all-breakpoints.html"
    const indexPath = "./static/index-767-all-breakpoints.html"
    const kontaktPath = "./static/kontakt-1200-all-breakpoints.html"
    const produktansichtPath = "./static/produktansicht-1200-all-breakpoints.html"
    const produktansichtdetailPath = "./static/produktansichtdetail-all-breakpoints.html"
    const shopPath = "./static/shop-375-1-all-breakpoints.html"
    const shop2Path = "./static/shop-767-all-breakpoints.html"
    const ueberBorbusPath = "./static/ueber-borbus-1200-all-breakpoints.html"
    const versandinfoPath = "./static/versandinfo-all-breakpoints.html"
    const warenkorbPath = "./static/warenkorb-767-all-breakpoints.html"
    const warenkorb2Path = "./static/warenkorb-768.html"
    const zahlungsoptionenPath = "./static/zahlungsoptionen-all-breakpoints.html"
    const zahlungsoptionen2Path = "./static/zahlungsoptionen-376-all-breakpoints.html"

    if (fs.existsSync(agbsPath)) fs.renameSync(agbsPath, "./static/agbs.html")
    if (fs.existsSync(bestellformularPath)) fs.renameSync(bestellformularPath, "./static/bestellformular.html")
    if (fs.existsSync(bestellubersichtPath)) fs.renameSync(bestellubersichtPath, "./static/bestelluebersicht.html")
    if (fs.existsSync(dankePath)) fs.renameSync(dankePath, "./static/danke.html")
    if (fs.existsSync(datenschutzPath)) fs.renameSync(datenschutzPath, "./static/datenschutz.html")
    if (fs.existsSync(fehlgeschlagenPath)) fs.renameSync(fehlgeschlagenPath, "./static/fehlgeschlagen.html")
    if (fs.existsSync(groessentabellePath)) fs.renameSync(groessentabellePath, "./static/groessentabelle.html")
    if (fs.existsSync(impressumPath)) fs.renameSync(impressumPath, "./static/impressum.html")
    if (fs.existsSync(indexPath)) fs.renameSync(indexPath, "./static/index.html")
    if (fs.existsSync(kontaktPath)) fs.renameSync(kontaktPath, "./static/kontakt.html")
    if (fs.existsSync(produktansichtPath)) fs.renameSync(produktansichtPath, "./static/produktansicht.html")
    if (fs.existsSync(produktansichtdetailPath)) fs.renameSync(produktansichtdetailPath, "./static/produktansichtdetail.html")
    if (fs.existsSync(shopPath)) fs.renameSync(shopPath, "./static/shop.html")
    if (fs.existsSync(shop2Path)) fs.unlinkSync(shop2Path)
    if (fs.existsSync(ueberBorbusPath)) fs.renameSync(ueberBorbusPath, "./static/ueber-borbus.html")
    if (fs.existsSync(versandinfoPath)) fs.renameSync(versandinfoPath, "./static/versandinfo.html")
    if (fs.existsSync(warenkorbPath)) fs.renameSync(warenkorbPath, "./static/warenkorb.html")
    if (fs.existsSync(warenkorb2Path)) fs.unlinkSync(warenkorb2Path)
    if (fs.existsSync(zahlungsoptionenPath)) fs.renameSync(zahlungsoptionenPath, "./static/zahlungsoptionen.html")
    if (fs.existsSync(zahlungsoptionen2Path)) fs.unlinkSync(zahlungsoptionen2Path)
  })

  eleventyConfig.addPassthroughCopy("./static/css")
  eleventyConfig.addPassthroughCopy("./static/fonts")
  eleventyConfig.addPassthroughCopy("./static/img")

  eleventyConfig.addPassthroughCopy({"./src/js": "./js"})

  const url = process.env.URL || "http://localhost:8888"
  eleventyConfig.addTransform("replace-url", (content) => {
    const result = content.replace(/https:\/\/borbus-shop.com/g, url)
    return result
  })

  eleventyConfig.addTransform("replace-css-paths", (content) => {
    const result = content.replace(/css\//g, "../css/")
    return result
  })

  eleventyConfig.addTransform("replace-img-paths", (content) => {
    const result = content.replace(/img\//g, "../img/")
    return result
  })

  // eleventyConfig.addPassthroughCopy({
  //   "node_modules/@paypal/paypal-js":
  //   "js/paypal-js"
  // })


//   eleventyConfig.addTransform("add-google-analytics-tag", (content) => {
//     const result = content.replace(/<\/head>/, `<!-- Global site tag (gtag.js) - Google Analytics -->
//   <script class="ga-tag" async src="https://www.googletagmanager.com/gtag/js?id=G-4LJYNJPT0Z"></script>
//   <script class="ga-tag" >
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());

//     gtag('config', 'G-4LJYNJPT0Z');
//   </script>
// </head>
//     `)
//     return result
//   })
  eleventyConfig.addTransform("add-paypal-js-sdk", (content, outputPath) => {
    const clientId = "AUa5jJtzo4x8OaUB5L-vLgCTQ4_KeVEXh8Xmid1wVKK_0BrLtZugYvFme5guu9J4ogJRzYREfyjon0xR"

    const scriptTag =
`
    <script src="https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR"></script>
  </body>
`
  if (outputPath && outputPath.endsWith("/bestelluebersicht/index.html")) {
    return content.replace(/<\/body>/, scriptTag)
  }
  return content
  })

  eleventyConfig.addTransform("add-global-script", (content) => {
    const scriptTag =
`
    <script type="module" src="../js/global.js"></script>
  </body>
`
    const result = content.replace(/<\/body>/, scriptTag)
    return result
  })

  eleventyConfig.addShortcode("expose", data => {
    return `
      <script id="__EXPOSE__">
        window.__DATA__=${JSON.stringify(data)}
        document.getElementById("__EXPOSE__").remove()
      </script>
    `
  })

  eleventyConfig.on("eleventy.before", async () => {

    if (fs.existsSync("./static/shop.html")) {
      fs.renameSync("./static/shop.html", "./static/shop.njk")
      const fileBuffer = fs.readFileSync("./static/shop.njk")

      const result = fileBuffer.toString().replace(/<\/body>/, `
    {% expose items %}
  </body>
      `)
      fs.writeFileSync("./static/shop.njk", result, "utf-8")
    }


    if (fs.existsSync("./static/produktansicht.html")) {
      fs.renameSync("./static/produktansicht.html", "./static/produktansicht.njk")
      const fileBuffer = fs.readFileSync("./static/produktansicht.njk")

      const result = fileBuffer.toString().replace(/<!DOCTYPE html>/, `---
pagination:
  data: items
  size: 1
permalink: "produktansicht{{ pagination.pageNumber + 1 }}/index.html"
---
<!DOCTYPE html>
      `).replace(/<\/body>/, `
    {% expose items[pagination.pageNumber] %}
  </body>
      `)

      fs.writeFileSync("./static/produktansicht.njk", result, "utf-8")
    }

    if (fs.existsSync("./static/produktansichtdetail.html")) {
      fs.renameSync("./static/produktansichtdetail.html", "./static/produktansichtdetail.njk")
      const fileBuffer = fs.readFileSync("./static/produktansichtdetail.njk")

      const result = fileBuffer.toString().replace(/<!DOCTYPE html>/, `---
pagination:
  data: items
  size: 1
permalink: "produktansichtdetail{{ pagination.pageNumber + 1 }}/index.html"
---
<!DOCTYPE html>
      `).replace(/<\/body>/, `
    {% expose items[pagination.pageNumber] %}
  </body>
      `)

      fs.writeFileSync("./static/produktansichtdetail.njk", result, "utf-8")
    }

    if (fs.existsSync("./static/css/globals.css")) {
      const fileBuffer = fs.readFileSync("./static/css/globals.css")
      const searchString = `@import url("https://px.animaapp.com/61aa0c1637bc8119fc5ecef2.61aa0c181a3b9f9d45993252.sBlExfs.hcp.png");`

      if (fileBuffer.toString().includes(searchString)) {
        const result = fileBuffer.toString().replace(/@import url\("https:\/\/px\.animaapp\.com\/61aa0c1637bc8119fc5ecef2\.61aa0c181a3b9f9d45993252\.sBlExfs\.hcp\.png"\);/, "")
        fs.writeFileSync("./static/css/globals.css", result, "utf-8")
      }
    }
  })

  return {
    dir: {
      input: "./static",
      output: "./public",
      data: "../src/_data",
    }
  }
}
