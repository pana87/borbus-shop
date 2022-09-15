import {
  _updateCartPointer,
  _removeItemFromCart,
  _inputIsEmpty,
  _openNameInputField,
  _openStreetInputField,
  _openZipInputField,
  _openEmailInputField
} from "./render.js"
import { _noAddressFound, _noCartItemFound, _noUserFound, _noUserSessionFound } from "./exceptions.js"
import { _getAddresses, _getCart } from "./storage.js"

function _onLoginButtonClick() {
  const loginButtons = document.querySelectorAll("div[class*='login1']")

  if (loginButtons.length === 0) return

  loginButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")
    button.addEventListener("click", async () => {
      const accountIdFields = document.querySelectorAll("input[name='accountId']")
      if (accountIdFields.length === 0) return
      let accountId
      accountIdFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        accountId = field.value
      })
      if (accountId === undefined) return

      const privateKeyFields = document.querySelectorAll("input[name='privateKey']")
      if (privateKeyFields.length === 0) return
      let privateKey
      privateKeyFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        privateKey = field.value
      })
      if (privateKey === undefined) return

      const securityKeyFields = document.querySelectorAll("input[name='securityKey']")
      if (securityKeyFields.length === 0) return
      let securityKey
      securityKeyFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        securityKey = field.value
      })
      if (securityKey === undefined) return

      // import key
      const dataAsBytes = new TextEncoder().encode(privateKey)
      const keyAsBytes = new TextEncoder().encode(securityKey)

      const passwordKey = await window.crypto.subtle.importKey(
        "raw",
        keyAsBytes,
        "PBKDF2",
        false,
        ["deriveKey"]
      )

      // derive key
      const salt = window.crypto.getRandomValues(new Uint8Array(32))
      const aesKey = await window.crypto.subtle.deriveKey({
        name: "PBKDF2",
        hash: { name: "SHA-256" },
        salt,
        iterations: 250000
      }, passwordKey, { name: "AES-GCM", length: 256 }, false, ["encrypt"])

      // encrypt data
      const iv = window.crypto.getRandomValues(new Uint8Array(12))
      const encryptedData = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv,
      }, aesKey, dataAsBytes)
      const encryptedBytes = new Uint8Array(encryptedData)
      const encryptedPackage = [...salt, ...iv, ...encryptedBytes]

      window.sessionStorage.setItem("userSession", JSON.stringify({
        accountId,
        data: encryptedPackage
      }))

      if (document.referrer.endsWith("/warenkorb/")) {
        window.location.assign("/bestellubersicht")
        return
      }
      window.location.assign("/accountuebersicht")

    })
  })
}
// _onLoginButtonClick()

function _onLoginLinkButtonClick() {
  const loginLinks = document.querySelectorAll("div[class*='login2']")

  if (loginLinks.length === 0) return

  loginLinks.forEach(link => {
    link.setAttribute("style", "cursor: pointer;")
    link.addEventListener("click", () => {
      if (!window.localStorage.getItem("userSession")) {
        alert("Es wurden keine lokalen Daten gefunden. Bitte registrieren Sie sich erneut.")
        return
      }
      if (!window)
      window.location.assign("/loginbereich")
      return
    })
  })
}
// _onLoginLinkButtonClick()

async function _onOrderButtonClick() {
  const orderButtons = document.querySelectorAll("div[class*='bestellen1']")

  if (orderButtons.length === 0) return

  orderButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")
    button.addEventListener("click", async () => {

      const cart = await _getCart()
      const addresses = await _getAddresses()

      if (cart.length === 0) {
        _noCartItemFound()
        return
      }

      if (addresses.length === 0) {
        _noAddressFound()
        return
      }

      const shippingAddress = addresses.filter(it => it.shippingAddress === true)[0]
      const billingAddress = addresses.filter(it => it.billingAddress === true)[0]

      // paypal api here

    })
  })
}
_onOrderButtonClick()

function _onPayButtonClick() {
  const payButtons = document.querySelectorAll("div[class*='bezahlen1']")

  if (payButtons.length === 0) return

  payButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")

    button.addEventListener("click", () => {

      if (!window.localStorage.getItem("cart")) {
        _noCartItemFound()
        return
      }

      if (!window.localStorage.getItem("addresses")) {
        _noAddressFound()
        return
      }

      window.location.assign("/bestelluebersicht")
    })
  })
}
_onPayButtonClick()

function _onCartButtonClick() {
  const cartButtonsCenter = document.querySelectorAll("div[class*='warenkorb-button-mitte']")

  if (cartButtonsCenter.length === 0) return

  cartButtonsCenter.forEach(button => button.addEventListener("click", () => {
    let cart = []
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }

    cart = JSON.parse(localStorage.getItem("cart")) || []

    const cartContainsDressId = cart.some(item => item.id === window.__DATA__.id)
    if (cartContainsDressId) {
      alert(`${window.__DATA__.name} ist bereits im Warenkorb`)
      return
    }

    cart = []
    cart.push(window.__DATA__)
    localStorage.setItem("cart", JSON.stringify(cart))
    alert(`${window.__DATA__.name} wurde erfolgreich in den Warenkorb gelegt`)

    _updateCartPointer()
  }))
}
if (window.__DATA__) {
  _onCartButtonClick()
}

function _onDeleteCartButtonClick() {
  const deleteButtons = document.querySelectorAll("div[class*='lschen']")

  if (deleteButtons.length === 0) return

  deleteButtons.forEach(element => {
    element.setAttribute("style", "cursor: pointer;")
    element.addEventListener("click", async () => {
      window.localStorage.removeItem("cart")
      alert("Es befindet sich kein Kleidchen im Warenkorb")
      window.location.assign("/shop")
    })
  })
}
_onDeleteCartButtonClick()

function _onCartButtonTopRightClick() {
  const cartButtons = document.querySelectorAll("div[class*='warenkorb-oben-rechts']")

  if (cartButtons.length === 0) return

  cartButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")
    button.addEventListener("click", async () => {

      const cart = await _getCart()

      if (cart.length === 0) {
        alert("Es befindet sich kein Kleidchen im Warenkorb")
        return
      }
      window.location.assign("/warenkorb")
    })
  })
}
_onCartButtonTopRightClick()

function _onRegisterButtonClick() {
  const registerButtons = document.querySelectorAll("div[class*='registrieren1']")

  if (registerButtons.length === 0) return

  registerButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")

    button.addEventListener("click", async () => {

      const nameFields = document.querySelectorAll("input[name='name']")
      if (nameFields.length === 0) return
      let name
      nameFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        name = field.value
      })
      if (name === undefined) return

      const streetFields = document.querySelectorAll("input[name='street']")
      if (streetFields.length === 0) return
      let street
      streetFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        street = field.value
      })
      if (street === undefined) return

      const zipFields = document.querySelectorAll("input[name='zip']")
      if (zipFields.length === 0) return
      let zip
      zipFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        zip = field.value
      })
      if (zip === undefined) return

      const emailFields = document.querySelectorAll("input[name='email']")
      if (emailFields.length === 0) return
      let email
      emailFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        email = field.value
      })
      if (email === undefined) return

      const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []

      if (addresses.length !== 0) {
        const lastElement = addresses.pop()
        lastElement.shippingAddress = false
        lastElement.billingAddress = false

        addresses.push(lastElement)
      }

      addresses.push({
        name,
        street,
        zip,
        email,
        shippingAddress: true,
        billingAddress: true,
      })

      window.localStorage.setItem("addresses", JSON.stringify(addresses))

      console.log(addresses);

      window.location.assign("/bestelluebersicht")
    })
  })
}
_onRegisterButtonClick()

function _onChangeShippingAddressButtonClick() {
  const elements = document.querySelectorAll("div[class*='ndern1']")

  if (elements.length === 0) return

  elements.forEach(element => {
    element.setAttribute("style", "cursor: pointer;")
    element.addEventListener("click", () => window.location.assign("/bestellformular"))
  })
}
_onChangeShippingAddressButtonClick()

function _onBackButtonClick() {
  const backButtons = document.querySelectorAll("div[class*='zurck']")

  if (backButtons.length === 0) return

  backButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")
    button.addEventListener("click", () => window.history.back())
  })
}
_onBackButtonClick()

function _onAboutBorbusButtonClick() {
  const aboutBorbusButtons = document.querySelectorAll("a[href*='ueberborbus']")

  if (aboutBorbusButtons.length === 0) return

  aboutBorbusButtons.forEach(button => button.setAttribute("href", "/ueber-borbus"))
}
_onAboutBorbusButtonClick()

function _onAgbButtonClick() {
  const agbButtons = document.querySelectorAll("a[href*='allgemeinegeschaftsbedingungen']")

  if (agbButtons.length === 0) return

  agbButtons.forEach(button => button.setAttribute("href", "/agbs"))
}
_onAgbButtonClick()

function _onAgbButton2Click() {
  const agb2Buttons = document.querySelectorAll("a[href*='allgemeinegeschaeftsbedingungen']")

  if (agb2Buttons.length === 0) return

  agb2Buttons.forEach(button => button.setAttribute("href", "/agbs"))
}
_onAgbButton2Click()

function _onDsgvoButtonClick() {
  const dsgvoButtons = document.querySelectorAll("a[href*='datenschutzerklaerung']")

  if (dsgvoButtons.length === 0) return

  dsgvoButtons.forEach(button => button.setAttribute("href", "/datenschutz"))
}
_onDsgvoButtonClick()
