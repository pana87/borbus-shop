import {
  _noUserSessionFound,
  _noAccountIdFound,
  _noCartItemFound,
  _noUserFound,
  _noAddressFound,
} from "./exceptions.js"
import { _getAddresses, _getCart } from "./storage.js"

export function _updateCartPointer() {
  const cartPointerTopRight = document.querySelectorAll("div[class*='anzahl-warenkorb']")

  if (cartPointerTopRight.length === 0) return

  const cart = JSON.parse(window.localStorage.getItem("cart")) || []
  cartPointerTopRight.forEach(pointer => pointer.innerHTML = `${cart.length}`)
}
_updateCartPointer()

export function _removeItemFromCart() {
  document.querySelectorAll("div[class*='kleidchenbezeichnung']").forEach(element => element.remove())
  document.querySelectorAll("img[class*='vorderseitebild']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='lschen']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='preis1']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='versand-5-7']").forEach(element => element.remove())

  _updateCartPointer()
}

export async function _renderShopList() {
  const shopListDivs = document.querySelectorAll("div[class*='shopliste']")

  if (shopListDivs.length === 0) return

  if (!window.__DATA__) return

  const nfts = window.__DATA__

  if (nfts.length === 0) return

  const nftContainer = []
  nfts.forEach(nft => {
    const dressId = nft.name.match(/\d+/)[0]
    const nftBox = document.createElement("div")
    nftBox.setAttribute("class", "item")
    nftBox.setAttribute("style", `
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      margin-bottom: 100px;
    `)

    if (window.innerWidth > 767) {
      nftBox.setAttribute("style", `
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;
        margin-bottom: 100px;
      `)
    }

    nftBox.innerHTML = `
      <a href="${window.__DATA__[dressId - 1].links.overview}">
        <img src="${window.__DATA__[dressId - 1].images.front}" alt="${window.__DATA__[dressId - 1].name}" style="width: 100%; object-fit: contain;"/>
      </a>
      <p>Kleidchen #${dressId}</p>
      <p>${window.__DATA__[dressId - 1].price} €</p>
      <a href="${window.__DATA__[dressId - 1].links.overview}" style="color: inherit;" >Einkaufen ᐅ</a>
    `
    nftContainer.push(nftBox)
  })

  if (nftContainer.length === 0) return

  shopListDivs.forEach(div => {
    div.innerHTML = " "

    div.style.position = "relative"
    div.style.bottom = "0"
    div.style.left = "0"
    div.style.top = "350px"
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.paddingBottom = "800px"
    div.style.display = "flex"
    div.style.flexWrap = "wrap"
    div.style.justifyContent = "space-around"
    div.style.alignItems = "center"
    div.parentElement.style.height = "auto"

    nftContainer.forEach(container => div.innerHTML += container.outerHTML)
  })

  const articleDivs = document.querySelectorAll("div[class*='x24-artikel']")

  if (articleDivs.length === 0) return

  articleDivs.forEach(div => div.innerHTML = `${nfts.length} Artikel`)
}
_renderShopList()

export async function _renderFrontImage() {
  const divs = document.querySelectorAll("div[class*='vorderseitebild']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => {
      div.innerHTML = `
        <img src="${window.__DATA__.images.front}" alt="${window.__DATA__.name}" style="object-fit: contain; width: 100%;" />
      `
    })
    return
  }

  const cart = await _getCart()

  if (cart.length !== 0) {
    divs.forEach(div => {
      div.innerHTML = `
        <img src="${cart[0].images.front}" alt="${cart[0].name}" style="object-fit: contain; width: 100%;" />
      `
    })
    return
  }
}
_renderFrontImage()

function _renderBackImage() {
  const divs = document.querySelectorAll("div[class*='rckseitebild']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => {
      div.innerHTML = `
        <img src="${window.__DATA__.images.back}" alt="${window.__DATA__.name}" style="object-fit: contain; width: 100%;" />
      `
    })
    return
  }
}
_renderBackImage()

async function _renderName() {
  const divs = document.querySelectorAll("div[class*='kleidchenbezeichnung']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.name}`)
    return
  }

  const cart = await _getCart()

  if (cart.length !== 0) {
    divs.forEach(div => div.innerHTML = `${cart[0].name}`)
    return
  }
}
_renderName()

async function _renderPrice() {
  const divs = document.querySelectorAll("div[class*='stckpreis']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.price} €`)
    return
  }

  const cart = await _getCart()

  if (cart.length !== 0) {
    divs.forEach(div => div.innerHTML = `${cart[0].price} €`)
    return
  }
}
_renderPrice()

function _renderInfoText() {
  const divs = document.querySelectorAll("div[class*='infotext']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `
    ${window.__DATA__.name} <br />
    ${window.__DATA__.description}
    `)
    return
  }
}
_renderInfoText()

function _renderCompatibility() {
  const divs = document.querySelectorAll("div[class*='vertraeglichkeit1']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.attributes.compatibility[0]} & ${window.__DATA__.attributes.compatibility[1]}`)
    return
  }
}
_renderCompatibility()

function _renderSize() {
  const divs = document.querySelectorAll("div[class*='groesse1']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.attributes.size}`)
    return
  }
}
_renderSize()

function _renderMaterial() {
  const divs = document.querySelectorAll("div[class*='stoff1']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.attributes.material}`)
    return
  }
}
_renderMaterial()

function _renderPattern() {
  const divs = document.querySelectorAll("div[class*='muster1']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.attributes.pattern}`)
    return
  }
}
_renderPattern()

function _renderDetailLinks() {
  const links = document.querySelectorAll("a[href*='produktansichtdetail1']")

  if (links.length === 0) return

  if (window.__DATA__) {
    links.forEach(link => link.setAttribute("href", `${window.__DATA__.links.detail}`))
    return
  }
}
_renderDetailLinks()

function _renderLinks() {
  const links = document.querySelectorAll("a[href*='produktansicht1']")

  if (links.length === 0) return

  if (window.location.pathname === "/shop/") return

  if (window.__DATA__) {
    links.forEach(link => link.setAttribute("href", `${window.__DATA__.links.overview}`))
    return
  }
}
_renderLinks()

function _renderDetailImage() {
  const divs = document.querySelectorAll("div[class*='detailaufnahme']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => {
      div.innerHTML = `
        <img src="${window.__DATA__.images.detail}" alt="${window.__DATA__.name}" style="object-fit: contain; width: 100%; opacity: 0.3;"/>
      `
    })
    return
  }
}
_renderDetailImage()

async function _renderCartList() {
  if (window.location.pathname === "/warenkorb/") {
    const cart = await _getCart()
    if (cart.length === 0) {
      _noCartItemFound()
      return
    }
  }
}
_renderCartList()

async function _renderTotalPrice() {
  const divs = document.querySelectorAll("div[class*='gesamtpreis1']")

  if (divs.length === 0) return

  const cart = await _getCart()

  const total = cart
    .map(item => parseFloat(item.price.replace(",", ".")))
    .reduce((prev, curr) => prev + curr, 0)

  if (cart.length === 0) {
    divs.forEach(div => div.remove())
    return
  }

  if (cart.length !== 0) {
    divs.forEach(div => div.innerHTML = `${total.toFixed(2)} €`)
    return
  }
}
_renderTotalPrice()

function _inputDefaultStyle(htmlInputElement) {
  htmlInputElement.setAttribute("style", `
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-left: 20px;
  `)
}

function _inputIsValidStyle(htmlInputElement) {
  htmlInputElement.setAttribute("style", `
    border-radius: 15px;
    border-color: green;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-left: 20px;
  `)
}

function _inputIsNotValidStyle(htmlInputElement) {
  htmlInputElement.setAttribute("style", `
    border-radius: 15px;
    border-color: red;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-left: 20px;
  `)
}

export function _inputIsEmpty(htmlInputElement) {
  if (htmlInputElement.validity.valueMissing) {
    _inputIsNotValidStyle(htmlInputElement)
    htmlInputElement.setAttribute("title", "Dieses Feld ist notwendig.")
  }
}

function _inputIsValid(htmlInputElement) {
  if (htmlInputElement.checkValidity()) {
    _inputIsValidStyle(htmlInputElement)
    htmlInputElement.setAttribute("title", "✅")
  }
}

// function _renderAccountIdInputField() {
//   const fields = document.querySelectorAll("div[class*='hedera-account-id-input']")

//   if (fields.length === 0) return

//   fields.forEach(field => {
//     const input = document.createElement("input")

//     input.setAttribute("type", "text")
//     input.setAttribute("name", "accountId")
//     input.setAttribute("pattern", "\\d.\\d.\\d{4,}")
//     input.setAttribute("required", "true")
//     input.setAttribute("title", "Geben Sie hier Ihre Hedera Account Id an.")

//     _inputDefaultStyle(input)

//     input.addEventListener("keyup", (event) => {
//       _inputIsEmpty(event.target)
//       if (input.validity.patternMismatch) {
//         _inputIsNotValidStyle(input)
//         input.setAttribute("title", "Hedera Account Ids haben die Form: 0.0.1234xx")
//       }
//       _inputIsValid(event.target)
//     })

//     field.appendChild(input)
//   })
//   return inputFields
// }
// _renderAccountIdInputField()

function _renderNameInputField() {
  const inputFields = document.querySelectorAll("div[class*='namederpersoneingabe']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "text")
    input.setAttribute("name", "name")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie hier Ihren vollständigen Namen ein.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields
}
_renderNameInputField()

function _renderStreetInputField() {
  const inputFields = document.querySelectorAll("div[class*='strasse1eingabe']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "text")
    input.setAttribute("name", "street")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie Ihre Straße und Hausnummer an, wie zum Beispiel: Hauptstr. 4")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields
}
_renderStreetInputField()

function _renderZipInputField() {
  const inputFields = document.querySelectorAll("div[class*='plz1eingabe']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "text")
    input.setAttribute("name", "zip")
    input.setAttribute("pattern", "[1-9][0-9]{4}\\s.[^\\s]+")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie die Postleitzahl und Ortschaft an.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      if (input.validity.patternMismatch) {
        input.setAttribute("style", `
          border-radius: 15px;
          border-color: red;
          background-color: transparent;
          width: 100%;
          height: 100%;
          padding-left: 20px;
        `)
        input.setAttribute("title", "Beispiel: 70771 Leinfelden-Echterdingen")
      }
      if (input.validity.valueMissing) {
        input.setAttribute("style", `
          border-radius: 15px;
          border-color: red;
          background-color: transparent;
          width: 100%;
          height: 100%;
          padding-left: 20px;
        `)
        input.setAttribute("title", "Dieses Feld ist notwendig.")
      }
      if (input.checkValidity()) {
        input.setAttribute("style", `
          border-radius: 15px;
          border-color: green;
          background-color: transparent;
          width: 100%;
          height: 100%;
          padding-left: 20px;
        `)
        input.setAttribute("title", "✅")
      }
    })
    field.appendChild(input)
  })
  return inputFields
}
_renderZipInputField()

function _renderEmailInputField() {
  const inputFields = document.querySelectorAll("div[class*='email12eingabe']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "email")
    input.setAttribute("name", "email")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie Ihre E-Mail Adresse an.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      if (input.validity.patternMismatch) {
        _inputIsNotValidStyle(input)
        input.setAttribute("title", "E-Mails haben die Form: stefanie.mueller@web.de")
      }
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields

}
_renderEmailInputField()

// function _privateKeyInputField() {
//   const inputFields = document.querySelectorAll("div[class*='private-key-input']")

//   if (inputFields.length === 0) return

//   inputFields.forEach(field => {
//     const input = document.createElement("input")

//     input.setAttribute("type", "password")
//     input.setAttribute("name", "privateKey")
//     input.setAttribute("required", "true")
//     input.setAttribute("title", "Bitte geben Sie Ihren Hedera Private Key an.")

//     _inputDefaultStyle(input)

//     input.addEventListener("keyup", (event) => {
//       _inputIsEmpty(event.target)
//       _inputIsValid(event.target)
//     })

//     field.appendChild(input)
//   })
//   return inputFields

// }
// _privateKeyInputField()

// function _securityKeyInputField() {
//   const inputFields = document.querySelectorAll("div[class*='sicherheitsschlssel-input']")

//   if (inputFields.length === 0) return

//   inputFields.forEach(field => {
//     const input = document.createElement("input")

//     input.setAttribute("type", "password")
//     input.setAttribute("name", "securityKey")
//     input.setAttribute("required", "true")
//     input.setAttribute("title", "Bitte geben Sie Ihren Sicherheitsschlüssen an.")

//     _inputDefaultStyle(input)

//     input.addEventListener("keyup", (event) => {
//       _inputIsEmpty(event.target)
//       _inputIsValid(event.target)
//     })

//     field.appendChild(input)
//   })
//   return inputFields

// }
// _securityKeyInputField()

export function _openNameInputField(cssSelector) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(cssSelector)

    if (elements.length === 0) return

    let name
    elements.forEach(element => {
      element.innerHTML = ""

      const input = document.createElement("input")
      input.setAttribute("type", "text")
      input.setAttribute("name", "name")
      input.setAttribute("required", "true")
      input.setAttribute("title", "Bitte geben Sie hier Ihren vollständigen Namen ein.")

      input.setAttribute("style", `
        border-width: 1px;
        border-color: grey;
        border-radius: 5px;
        background-color: transparent;
      `)

      input.addEventListener("keypress", (event) => {
        // console.log(event);
        if (input.validity.valueMissing) {
          input.setAttribute("style", `
            border-color: red;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Dieses Feld ist notwendig")
        }
        if (input.checkValidity()) {
          input.setAttribute("style", `
            border-color: green;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Bestätigen Sie mit Enter")
        }

        if (event.key === "Enter") {
          if (!input.checkValidity()) {
            // _updateAddressName(cssSelector)
            // _updateAddressStreet(cssSelector)
            // _updateAddressZip(cssSelector)
            // _updateAddressEmail(cssSelector)
            _updateAllAddressFields()
            return
          }
          name = input.value
          element.innerHTML = name
          resolve(name)
        }
      })
      element.append(input)
      input.focus()
      input.select()
    })
  })

}

export function _openStreetInputField(cssSelector) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(cssSelector)

    if (elements.length === 0) return

    let street
    elements.forEach(element => {
      element.innerHTML = ""

      const input = document.createElement("input")
      input.setAttribute("type", "text")
      input.setAttribute("name", "street")
      input.setAttribute("required", "true")
      input.setAttribute("title", "Bitte geben Sie Ihre Straße und Hausnummer ein.")

      input.setAttribute("style", `
        border-width: 1px;
        border-color: grey;
        border-radius: 5px;
        background-color: transparent;
      `)

      input.addEventListener("keypress", (event) => {
        if (input.validity.valueMissing) {
          input.setAttribute("style", `
            border-color: red;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Dieses Feld ist notwendig")
        }
        if (input.checkValidity()) {
          input.setAttribute("style", `
            border-color: green;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Bestätigen Sie mit Enter")
        }

        if (event.key === "Enter") {
          if (!input.checkValidity()) {
            // _updateAddressName(cssSelector)
            // _updateAddressStreet(cssSelector)
            // _updateAddressZip(cssSelector)
            // _updateAddressEmail(cssSelector)
            _updateAllAddressFields()
            return
          }
          street = input.value
          element.innerHTML = street
          resolve(street)
        }
      })
      element.append(input)
      input.focus()
      input.select()
    })
  })
}

export function _openZipInputField(cssSelector) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(cssSelector)

    if (elements.length === 0) return

    let zip
    elements.forEach(element => {
      element.innerHTML = ""

      const input = document.createElement("input")
      input.setAttribute("type", "text")
      input.setAttribute("name", "zip")
      input.setAttribute("required", "true")
      input.setAttribute("title", "Bitte geben Sie Ihre Postleitzahl und den Ort ein.")

      input.setAttribute("style", `
        border-width: 1px;
        border-color: grey;
        border-radius: 5px;
        background-color: transparent;
      `)

      input.addEventListener("keypress", (event) => {
        if (input.validity.valueMissing) {
          input.setAttribute("style", `
            border-color: red;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Dieses Feld ist notwendig")
        }
        if (input.checkValidity()) {
          input.setAttribute("style", `
            border-color: green;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Bestätigen Sie mit Enter")
        }

        if (event.key === "Enter") {
          if (!input.checkValidity()) {
            // _updateAddressName(cssSelector)
            // _updateAddressStreet(cssSelector)
            // _updateAddressZip(cssSelector)
            // _updateAddressEmail(cssSelector)
            _updateAllAddressFields()
            return
          }
          zip = input.value
          element.innerHTML = zip
          resolve(zip)
        }
      })
      element.append(input)
      input.focus()
      input.select()
    })
  })
}

export function _openEmailInputField(cssSelector) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(cssSelector)

    if (elements.length === 0) return

    let email
    elements.forEach(element => {
      element.innerHTML = ""

      const input = document.createElement("input")
      input.setAttribute("type", "email")
      input.setAttribute("name", "email")
      input.setAttribute("required", "true")
      input.setAttribute("title", "Bitte geben Sie Ihre E-Mail Adresse ein.")

      input.setAttribute("style", `
        border-width: 1px;
        border-color: grey;
        border-radius: 5px;
        background-color: transparent;
      `)

      input.addEventListener("keypress", (event) => {
        if (input.validity.valueMissing) {
          input.setAttribute("style", `
            border-color: red;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Dieses Feld ist notwendig")
        }
        if (input.checkValidity()) {
          input.setAttribute("style", `
            border-color: green;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Bestätigen Sie mit Enter")
        }

        if (event.key === "Enter") {
          if (!input.checkValidity()) {
            // _updateAddressName(cssSelector)
            // _updateAddressStreet(cssSelector)
            // _updateAddressZip(cssSelector)
            // _updateAddressEmail(cssSelector)
            _updateAllAddressFields()
            return
          }
          email = input.value
          element.innerHTML = email
          resolve(email)
        }
      })
      element.append(input)
      input.focus()
      input.select()
    })
  })
}

function _renderShippingNameFields() {
  const shippingNameFields = document.querySelectorAll("div[class*='kundennameinput1']")

  if (shippingNameFields.length === 0) return

  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []
  if (addresses.length === 0) {
    _noAddressFound()
    return
  }

  shippingNameFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].name
  })
}
_renderShippingNameFields()

function _renderBillingNameFields() {
  const billingNameFields = document.querySelectorAll("div[class*='kundennameinput2']")

  if (billingNameFields.length === 0) return

  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []

  billingNameFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.billingAddress === true)[0].name
  })
}
_renderBillingNameFields()

function _renderShippingStreetFields() {
  const shippingStreetFields = document.querySelectorAll("div[class*='kundenstrasseinput1']")

  if (shippingStreetFields.length === 0) return

  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []

  shippingStreetFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].street
  })
}
_renderShippingStreetFields()

function _renderBillingStreetFields() {
  const billingStreetFields = document.querySelectorAll("div[class*='kundenstrasseinput2']")

  if (billingStreetFields.length === 0) return

  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []

  billingStreetFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.billingAddress === true)[0].street
  })
}
_renderBillingStreetFields()

function _renderShippingZipFields() {
  const shippingZipFields = document.querySelectorAll("div[class*='kundenplzinput1']")

  if (shippingZipFields.length === 0) return

  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []

  shippingZipFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].zip
  })
}
_renderShippingZipFields()

function _renderBillingZipFields() {
  const billingZipFields = document.querySelectorAll("div[class*='kundenplzinput2']")

  if (billingZipFields.length === 0) return

  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []

  billingZipFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.billingAddress === true)[0].zip
  })
}
_renderBillingZipFields()

function _renderShippingEmailFields() {
  const shippingEmailFields = document.querySelectorAll("div[class*='kundenemailinput1']")

  if (shippingEmailFields.length === 0) return

  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []

  shippingEmailFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].email
  })
}
_renderShippingEmailFields()

function _renderPaypalButton(id) {

  if (window.location.pathname !== "/bestelluebersicht/") return

  const cart = JSON.parse(window.localStorage.getItem("cart")) || []
  if (cart.length === 0) {
    _noCartItemFound()
    return
  }

  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []
  if (addresses.length === 0) {
    _noAddressFound()
    return
  }

  const shippingAddress = addresses.filter(it => it.shippingAddress === true)[0]
  const zip = shippingAddress.zip.split(" ")[0]
  const area = shippingAddress.zip.split(" ")[1]

  const total = cart
  .map(item => parseFloat(item.price.replace(",", ".")))
  .reduce((prev, curr) => prev + curr, 0)

  paypal.Buttons({
    style: {
      layout: 'horizontal',
      color:  'blue',
      shape:  'rect',
      label:  'paypal'
    },

    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2)
          },

          shipping: {
            name: {
              full_name: shippingAddress.name
            },
            address: {
              address_line_1: shippingAddress.street,
              admin_area_2: area,
              postal_code: zip,
              country_code: 'DE',
            }
          }
        }]
      })
    },

    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name)
        window.location.assign("/danke")
      });
    },

    onError: function (error) {
      window.location.assign("/fehlgeschlagen")
    }
  }).render(id)
}
_renderPaypalButton("div[class*='paypal-button-mobile']")
_renderPaypalButton("div[class*='paypal-button-tablet']")
_renderPaypalButton("div[class*='paypal-button-small-desktop']")
_renderPaypalButton("div[class*='paypal-button-large-desktop']")
