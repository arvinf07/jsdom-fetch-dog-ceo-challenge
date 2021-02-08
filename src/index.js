const dogDiv = document.querySelector('#dog-image-container') 
// document.addEventListener("DOMContentLoaded", (event) )
document.addEventListener('DOMContentLoaded', (event) => {
  fetch('https://dog.ceo/api/breeds/image/random/4')
  .then(resp => resp.json())
  .then(json => createImage(json));
});
function createImage(dogs) {
  const imageUrl = dogs.message
  for (let i = 0; i<imageUrl.length; i++){
  const image = document.createElement('img')
  image.src = imageUrl[i]
  dogDiv.appendChild(image)
}
};
const dropDown = document.getElementById('breed-dropdown')
dropDown.addEventListener('change', getBreeds)
function getBreeds(){
  fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(json => makeList(json['message']))//console.log(json['message'])
}
const breedList = document.getElementById('dog-breeds')
function makeList(breeds){
  if (dropDown.value === 'select'){
    for (const breed in breeds) {
      //  breedList.innerHTML += `<li>${breed}: ${breeds[breed]}</li>` 
      let li = document.createElement('li')
      li.innerText = `${breed}: ${breeds[breed]}`
      breedList.appendChild(li);
      li.addEventListener('click', (event) => {
        li.style.backgroundColor = "red"; // even.target same with li
      })
    }
  } else {
    let letter = dropDown.value
    breedList.innerHTML = ""
    for (const breed in breeds){
      if (breed.charAt(0) === letter){
        let li = document.createElement('li')
        li.innerText = `${breed}: ${breeds[breed]}`
        breedList.appendChild(li);
        li.addEventListener('click', (event) => {
          li.style.backgroundColor = "red"; // even.target same with li
        })
        // breedList.innerHTML += `<li>${breed}: ${breeds[breed]}</li>` 
      }
    }
  }
}
getBreeds();