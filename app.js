//Тестовое завдание:
//Есть кнопка.  При помощи нее загрузить выбранные фото с компьютера и отобразить их с названием фото
// Фото должны оставаться при перезагрузке страницы. При повторному виборе фото, они дожны добавдяться к существующим.
//Иметь функционал для удаления отдельной фотографии. Сделать анимацию, сначала фото зачеркивается, потом удаляется.
//Стилизация на собственное усмотрение, хорошее оформление приветствуется

const buttonLoad = document.querySelector("#btn");
const photoContainer = document.querySelector("#photo-container");

const arrayOfStoragedImgs = JSON.parse(localStorage.getItem("images") || "[]"); // массив объектов
// console.log(arrayOfStoragedImgs)
arrayOfStoragedImgs.forEach((element) => {
  const divForPhoto = renderPhoto(element.name, element.src);
  divForPhoto.setAttribute("data-id", element.dataId);
  photoContainer.append(divForPhoto);
});

buttonLoad.addEventListener("change", onBtnLoadClick);
photoContainer.addEventListener("click", onBtnDeleteClick);

function onBtnLoadClick(e) {
  const selectedImg = e.target.files[0];
  const nameOfFile = selectedImg.name;

  const reader = new FileReader();
  reader.onload = function (e) {
    const divForPhoto = renderPhoto(nameOfFile, e.target.result);
    photoContainer.append(divForPhoto);

    const retrievedImages = JSON.parse(localStorage.getItem("images") || "[]");
    const img = {
      dataId: Math.random(),
      name: nameOfFile,
      src: e.target.result,
    };

    retrievedImages.push(img);

    localStorage.setItem("images", JSON.stringify(retrievedImages));

    divForPhoto.setAttribute("data-id", img.dataId);
  };

  reader.readAsDataURL(selectedImg);
}

function renderPhoto(stringFileName, src) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const fileName = document.createElement("div");
  const buttonDelete = document.createElement("button");

  img.classList.add("show-photo");
  img.src = src;

  fileName.classList.add("photo-name");
  buttonDelete.classList.add("delete");

  fileName.textContent = stringFileName;
  buttonDelete.textContent = "Delete";
  div.append(img);
  div.append(fileName);
  div.append(buttonDelete);
  return div;
}

function onBtnDeleteClick(e) {
  if (!e.target.classList.contains("delete")) {
    return;
  }

  const button = e.target;
  console.log(e.target.parentNode);

  const dataId = e.target.parentNode.dataset.id;
  // const dataId = button.parentNode.getAttribute("data-id")

  console.log(dataId);

  const retrievedImages = JSON.parse(localStorage.getItem("images"));
  console.log(retrievedImages);

  retrievedImages.filter(element => {element.dataId !== +dataId});
      
  // console.log(retrievedImages);
  localStorage.setItem("images", JSON.stringify(retrievedImages));
  // e.target.parentNode.remove();

  //удалить из localstorage
}
