const url = "https://striveschool-api.herokuapp.com/api/product";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZjAxMDI1NGU4ODAwMTgzZjE4YTQiLCJpYXQiOjE2OTk2MDY1NDQsImV4cCI6MTcwMDgxNjE0NH0.0qI6ZXIBq7k15gJ4m71fqgm--AV4OOkFF4FI_NLQVxI";
const ProdName = document.getElementById("name");
const ProdDescription = document.getElementById("description");
const prodBrand = document.getElementById("brand");
const prodImageUrl = document.getElementById("imageUrl");
const prodPrice = document.getElementById("price");
const inputButton = document.getElementById("inputButton");
const objContainer = document.getElementById("objContainer");
const idSearch = document.getElementById("idInput");
const searchButton = document.getElementById("searchButton");
const editButton = document.getElementById("editButton");
const backButton = document.getElementById("backButton");
const dinamicTitle = document.getElementById("dinamicTitle");
const resetButton = document.getElementById("resetButton");
const span = document.getElementById("close1");
const span2 = document.getElementById("close2");
const modal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const deleteModalBtn = document.getElementById("deleteModalBtn");
const closeDeleteModalBtn = document.getElementById("closeDeleteModalBtn");
const deleteModal = document.getElementById("deleteModal");
const deleteModalTitle = document.getElementById("deleteModalTitle");
const deleteModalText = document.getElementById("deleteModalText");

inputButton.onclick = function (event) {
  event.preventDefault();
  sessionStorage.clear();
  const data = {
    name: ProdName.value,
    description: ProdDescription.value,
    brand: prodBrand.value,
    imageUrl: prodImageUrl.value,
    price: prodPrice.value
  };
  if (
    data.name !== "" &&
    data.description !== "" &&
    data.brand !== "" &&
    data.imageUrl !== "" &&
    data.price !== ""
  ) {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(
        (response) => response.json(),
        (objContainer.innerHTML = ""),
        (ProdName.value = ""),
        (ProdDescription.value = ""),
        (prodBrand.value = ""),
        (prodImageUrl.value = ""),
        (prodPrice.value = ""),
        (idSearch.value = ""),
        (modalTitle.textContent = "Complimenti"),
        (modalText.textContent = "Oggetto Caricato Con Successo"),
        (modal.style.display = "block")
      )
      .then(fetchAndDisplay());
  } else {
    (modalTitle.textContent = "Attenzione"),
      (modalText.textContent =
        "Inserisci tutti i valori per creare un oggetto"),
      (modal.style.display = "block");
  }
};

// Funzione onload

window.onload = function () {
  if (sessionStorage.getItem("selectedProduct")) {
    searchButton.disable = true;
    let objAsString = JSON.parse(sessionStorage.getItem("selectedProduct"));
    idSearch.value = objAsString;
    const url2 =
      "https://striveschool-api.herokuapp.com/api/product" + objAsString;
    fetch(url2, {
      method: "GET",
      headers: {
        Authorization: apiKey
      }
    })
      .then((raw) => {
        return raw.json;
      })
      .then((dato) => {
        console.log(dato);
        displayObj(dato);
        inputButton.disable = true;
        editButton.disable = false;
        editButton.hidden = false;
        backButton.disable = false;
        backButton.hidden = false;
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    fetchAndDisplay();
  }
};

const fetchAndDisplay = function () {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey
    }
  })
    .then((raw) => {
      return raw.json();
    })
    .then((dati) => {
      displayObj(dati);
    });
};

// Funzione display oggetti

function displayObj(objects) {
  objects.forEach((object) => {
    const objDiv = document.createElement("div");
    objDiv.className = "objDiv";
    objDiv.classList.add("d-flex", "col-12", "col-lg-6");

    const imageDiv = document.createElement("div");
    imageDiv.className = "imageDiv";

    const objImage = document.createElement("img");
    objImage.src = object.imageUrl;
    objImage.alt = object.description + object.brand + object.name;
    objImage.className = "objImage";

    const infoDiv = document.createElement("div");
    infoDiv.className = "infoDiv";
    infoDiv.classList.add("d-flex", "flex-column", "justify-content-evenly");

    const objName = document.createElement("h3");
    objName.textContent = "Name: " + object.name;

    const objBrand = document.createElement("p");
    objBrand.textContent = "Brand: " + object.brand;

    const objDescription = document.createElement("p");
    objDescription.textContent = "Description: " + object.description;

    const objPrice = document.createElement("p");
    objPrice.textContent = "Price: A partire da " + object.price + "€";

    const objId = document.createElement("p");

    const idAnchor = document.createElement("a");
    idAnchor.text = "ID: " + object._id;
    idAnchor.href = "#inputButton";
    idAnchor.className = "anchor";

    objDiv.appendChild(imageDiv);
    imageDiv.appendChild(objImage);
    objDiv.appendChild(infoDiv);
    infoDiv.appendChild(objName);
    infoDiv.appendChild(objBrand);
    infoDiv.appendChild(objDescription);
    infoDiv.appendChild(objPrice);
    infoDiv.appendChild(objId);
    objId.appendChild(idAnchor);
    objContainer.appendChild(objDiv);

    dinamicTitle.textContent = "Crea Un Nuovo Oggetto";

    //Funzione per inserire l'ID oggetto nel form Input

    idAnchor.onclick = function () {
      idSearch.value = object._id;
    };
  });
}
//Funzione Search tramite id

searchButton.onclick = function (event) {
  event.preventDefault();

  if (searchForm.checkValidity()) {
    const url2 =
      "https://striveschool-api.herokuapp.com/api/product" + idSearch.value;
    console.log(url2);
    fetch(url2, {
      method: "GET",
      headers: {
        Authorization: apiKey
      }
    })
      .then((raw) => {
        if (!raw.ok) {
          throw new Error("Nessun prodotto corrisponde all'Id inserita.");
        }
        return raw.json();
      })
      .then((dato) => {
        console.log(dato);
        objContainer.innerHTML = "";
        displayObj(dato);
        inputButton.disable = true;
        editButton.disable = false;
        editButton.hidden = false;
        backButton.disable = false;
        backButton.hidden = false;
      })
      .catch((error) => {
        modalTitle.textContent = "Attenzione";
        (modalText.textContent = error.message)(
          (modal.style.display = "block")
        );
      });
  } else {
    (modalTitle.textContent = "Attenzione"),
      (modalText.textContent =
        "Inserisci un id dell'oggetto desiderato per passare alla modalità modifica")(
        (modal.style.display = "block")
      );
    return;
  }
};
//Funzione display oggetti selezionati

function displayIdObj(object) {
  const objDiv = document.createElement("div");
  objDiv.className = "objDiv";
  objDiv.classList.add("d-flex", "col-12", "col-lg-6");

  const imageDiv = document.createElement("div");
  imageDiv.className = "imageDiv";

  const objImage = document.createElement("img");
  objImage.src = object.imageUrl;
  objImage.alt = object.description + object.brand + object.name;
  objImage.className = "objImage";

  const infoDiv = document.createElement("div");
  infoDiv.className = "infoDiv";
  infoDiv.classList.add("d-flex", "flex-column", "justify-content-evenly");

  const objName = document.createElement("h3");
  objName.textContent = "Name: " + object.name;

  const objBrand = document.createElement("p");
  objBrand.textContent = "Brand: " + object.brand;

  const objDescription = document.createElement("p");
  objDescription.textContent = "Description: " + object.description;

  const objPrice = document.createElement("p");
  objPrice.textContent = "Price: A partire da " + object.price + "€";

  const objId = document.createElement("p");
  objId.textContent = "ID: " + object._id;

  const objDeleteButton = document.createElement("button");
  objDeleteButton.type = "button";
  objDeleteButton.classList.add("button");
  objDeleteButton.textContent = "Rimuovi";

  objDiv.appendChild(objImage);
  objDiv.appendChild(infoDiv);
  infoDiv.appendChild(objName);
  infoDiv.appendChild(objBrand);
  infoDiv.appendChild(objDescription);
  infoDiv.appendChild(objPrice);
  infoDiv.appendChild(objId);

  objContainer.appendChild(objDiv);
  infoDiv.appendChild(objDeleteButton);

  ProdName.value = object.name;
  ProdDescription.value = object.description;
  prodBrand.value = object.brand;
  prodImageUrl.value = object.imageUrl;
  prodPrice.value = object.price;
  dinamicTitle.textContent = "Modifica Il Tuo Oggetto";
}
// funzione chiusura Modali

span.onclick = function () {
  modal.style.display = "none";
};

span2.onclick = function () {
  deleteModal.style.display = "none";
};

closeDeleteModalBtn.onclick = function () {
  deleteModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
};
