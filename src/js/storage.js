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

export function _storeToNftStorage(blob) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${process.env.URL}/store-to-nft-storage`);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => resolve(xhr.responseText)
    console.log(blob);
    xhr.send(JSON.stringify(blob));
  })
}

export function _getFromNftStorage(cid) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://ipfs.io/ipfs/${cid}`)

    xhr.onload = () => resolve(JSON.parse(xhr.responseText))

    xhr.send()
  })
}
