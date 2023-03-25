let loadingCharacters = false;

const main = document.querySelector('.main');
const modalImg = document.querySelector('.modal__img');

const name = document.getElementById("name");
const status = document.getElementById("status");
const species = document.getElementById("species");
const origin = document.getElementById("origin");
const locationC = document.getElementById("location");
const gender = document.getElementById("gender");

let page = 1;
let charactersList = [];



async function getCharacters() {

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await response.json();

    charactersList = [...charactersList, ...data.results];

    page = data.info.next ? page + 1 : null;

    data.results.forEach(character => {
      const card = document.createElement('div');
      card.dataset.number = character.id
      card.classList.add('card');

      const image = document.createElement('img');
      image.classList.add('img');
      image.src = character.image;
      image.alt = `picture of ${character.name}`

      const name = document.createElement('h2');
      name.classList.add('card__title');
      name.textContent = character.name;

      card.append(image);
      card.append(name);
      main.append(card);
    });
    loadingCharacters = false;
  } catch (err) {
    console.log(err)
    const text = document.createElement('span');
    main.append(text)
    text.innerHTML = "Something wrong..."
  }
}

getCharacters();

function showBackground(e) {
  let event = e.target.closest('div')

  if (event.className == "card") {
    modalImg.src = charactersList[event.dataset.number - 1].image
    modalImg.alt = `pictures of ${charactersList[event.dataset.number - 1].name}`
    name.value = charactersList[event.dataset.number - 1].name
    status.value = charactersList[event.dataset.number - 1].status
    species.value = charactersList[event.dataset.number - 1].species
    origin.value = charactersList[event.dataset.number - 1].origin.name
    locationC.value = charactersList[event.dataset.number - 1].location.name
    gender.value = charactersList[event.dataset.number - 1].gender
  }

  document.querySelector('.background').classList.toggle("background--active")
  document.querySelector('.page').classList.toggle("lock")
  document.querySelector('.modal').classList.toggle("modal--none")
}


window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5 && !loadingCharacters && page) {
    loadingCharacters = true;
    setTimeout(() => {
      getCharacters();
    }, 10);
  }
});

main.addEventListener('click', showBackground);
document.querySelector('.background').addEventListener('click', showBackground);

document.querySelector("button").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})