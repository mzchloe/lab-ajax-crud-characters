const charactersAPI = new APIHandler('http://localhost:8000');
const oneCharacter = document.querySelector('.characterId');
const deleteCharacter = document.querySelector('.deleteId');

const editId = document.querySelector('.editId');
const editName = document.querySelector('.editName');
const editOccupation = document.querySelector('.editOccupation');
const editWeapon = document.querySelector('.editWeapon');
const editCartoonCheck = document.querySelector('.editCartoonCheck');

const newName = document.querySelector('.newName');
const newOccupation = document.querySelector('.newOccupation');
const newWeapon = document.querySelector('.newWeapon');
const newCartoon = document.querySelector('.newCartoon');


let checkbox = false;

window.addEventListener('load', () => {
  //the fetch all button
  document.getElementById('fetch-all').addEventListener('click', function (event) {
      charactersAPI
        .getFullList()
         .then((result) => console.log(result.data));
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
     charactersAPI
      .getOneRegister(oneCharacter.value)
        .then((result) => console.log(result.data))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    charactersAPI
      .deleteOneRegister(deleteCharacter.value)
        .then(() => { console.log('Character has been successfully deleted')
        })
        .catch((error) => console.log('Character not found'))

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
      if (editCartoonCheck.checked) {
        checkbox = true 
      } 
        charactersAPI
          .updateOneRegister(editId.value), {
            name: editName.value,
            occupation: editOccupation.value,
            weapon: editWeapon.value,
            cartoon: checkbox,
            id: editId.value,
          }
          .then((result) => console.log(result.data))
          .catch((error) => console.log('Character not found'))
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
      if (newCartoon.checked) {
        checkbox = true
      }
        charactersAPI.createOneRegister({
          name: newName.value,
          occupation: newOccupation.value,
          weapon: newWeapon.value,
          cartoon: checkbox,
          //id: 
        })
        .then((result) => console.log(result.data))
        .catch((error) => console.log('Some fields are entered incorrectly'))
  });
});
