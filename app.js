const buttonLoad = document.querySelector("#btn");
const photoContainer = document.querySelector("#photo-container");

const arrayOfStoragedImgs =  JSON.parse(localStorage.getItem("images") || "[]");// массив объектов
console.log(arrayOfStoragedImgs)
arrayOfStoragedImgs.forEach(element => {

  const divForPhoto = renderPhoto(element.name, element.src);
  photoContainer.append(divForPhoto); 

});

buttonLoad.addEventListener("change", onBtnLoadClick);
photoContainer.addEventListener("click", onBtnDeleteClick);

function onBtnLoadClick(e) {
  // console.log(buttonLoad.value);

  const selectedImg = e.target.files[0];
  const nameOfFile = selectedImg.name;

  const reader = new FileReader();
  reader.onload = function (e) {

    const divForPhoto = renderPhoto(nameOfFile, e.target.result);
    photoContainer.append(divForPhoto);

      try {
        let images = JSON.parse(localStorage.getItem("images") || "[]");
         const img ={
           name: nameOfFile,
           src: e.target.result
         }

        images.push(img);

        localStorage.setItem("images", JSON.stringify(images));        

      } catch (e) {
        console.log("Storage failed: " + e);
      }
  };
  reader.readAsDataURL(selectedImg);
  // buttonLoad.value = "";
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
function saveImgInLocalstorage(){

}


   


function onBtnDeleteClick(e) {
  if (!e.target.classList.contains("delete")) {
    return;
  }
}
