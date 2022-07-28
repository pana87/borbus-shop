export function _getCart() {
  return new Promise((resolve, reject) => {
    if (!window.localStorage.getItem("cart")) {
      resolve([])
    }
    resolve(JSON.parse(window.localStorage.getItem("cart")))
  })
}

export function _getAddresses() {
  return new Promise((resolve, reject) => {
    if (!window.localStorage.getItem("addresses")) {
      resolve([])
    }
    resolve(JSON.parse(window.localStorage.getItem("addresses")))
  })
}
