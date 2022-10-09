import {
  _updateCartPointer,
  _inputIsEmpty,
} from "./render.js"
import { _noAddressFound, _noCartItemFound } from "./exceptions.js"
import { _getCart } from "./storage.js"

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
