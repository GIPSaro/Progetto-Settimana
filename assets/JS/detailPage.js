const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjAxMDI1NGU4ODAwMTgzZjE4YTQiLCJpYXQiOjE2OTk2MDY1NDQsImV4cCI6MTcwMDgxNjE0NH0.0qI6ZXIBq7k15gJ4m71fqgm--AV4OOkFF4FI_NLQVxI";

const detailObjContainer = document.getElementById("detailObjContainer");

window.onload = function () {
  let objAsString = JSON.parse(sessionStorage.getItem("selectedProduct"));
  const url2 =
    "https://striveschool-api.herokuapp.com/api/product" + objAsString;
  fetch(url2, {
    method: "GET",
    headers: {
      Authorization: apiKey
    }
  })
    .then((raw) => {
      return raw.json();
    })
    .then((dato) => {
      displayObj(dato);
    });
  const displayObj = function () {
    const objDiv = document.createElement("div");
    objDiv.className = "objDiv2";
    objDiv.classList.add("d-flex", "justify-content-evenly");

    const objImage = document.createElement("img");
    objImage.src = object.imageUrl;
    objImage.alt = object.description + object.brand + object.name;
    objImage.className = "objImage2";

    const infoDiv = document.createElement("div");
    infoDiv.className = "infoDiv2";
    infoDiv.classList.add("d-flex", "flex-column", "justify-content-evenly");

    const objName = document.createElement("h3");
    objName.textContent = "Name: " + object.name;

    const objBrand = document.createElement("p");
    objBrand.textContent = "Brand: " + object.brand;

    const objDescription = document.createElement("p");
    objDescription.textContent = "Description: " + object.description;

    const objPrice = document.createElement("p");
    objPrice.textContent = "Price a partire da: " + objPrice + "€";

    objDiv.appendChild(objImage);
    objDiv.appendChild(infoDiv);
    infoDiv.appendChild(objName);
    infoDiv.appendChild(objBrand);
    infoDiv.appendChild(objDescription);
    infoDiv.appendChild(objPrice);

    detailObjContainer.appendChild(objDiv);
  };
};
