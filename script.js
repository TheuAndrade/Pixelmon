let sendButton = document.querySelector("#searchPokemonBtn");
let closeBtn = document.querySelector(".xMark");

function capitalizeFirstLetter(str) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}

function runCode() {
  let pokeName = document.querySelector("#pokemonTypeArea").value.toLowerCase();
  let pokePic = document.querySelector("#pokePicture");
  let pokeNameTitle = document.querySelector("#pokeNameTitle");
  let pokeForteList = document.querySelector("#forteCList");
  let itemsForteList = pokeForteList.getElementsByTagName("li");
  let pokeFracoList = document.querySelector("#fracoCList");
  let itemsFracoList = pokeFracoList.getElementsByTagName("li");
  document.querySelector(".pokemonMain").style.display = "none";
  let active = true;

  axios
    .get(`https:pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(function (response) {
      pokePic.src = response.data.sprites.front_default;
      let pokeNameTittleCap = capitalizeFirstLetter(pokeName);
      pokeNameTitle.innerHTML = `${pokeNameTittleCap}`;
      document.querySelector(
        "#pokemonTypeTitle"
      ).innerHTML = `Type : ${response.data.types[0].type.name}`;
      console.log(response.data.types[0].type.url);
      return axios.get(response.data.types[0].type.url);
    })
    .then(function (response) {
      document.querySelector(".forteC").style.display = "block";
      document.querySelector(".fracoC").style.display = "block";

      for (let i = 1; i < itemsForteList.length; i++) {
        console.log(i - 1);
        if (
          typeof response.data.damage_relations.double_damage_to[i - 1] !==
          "undefined"
        ) {
          let thisElement = capitalizeFirstLetter(
            response.data.damage_relations.double_damage_to[i - 1].name
          );
          itemsForteList[i].innerHTML = thisElement;
        } else {
          itemsForteList[i].innerHTML = " ";
          break;
        }
      }
      for (let i = 1; i < itemsFracoList.length; i++) {
        console.log(i - 1);
        if (
          typeof response.data.damage_relations.double_damage_from[i - 1] !==
          "undefined"
        ) {
          let thisElement = capitalizeFirstLetter(
            response.data.damage_relations.double_damage_from[i - 1].name
          );
          itemsFracoList[i].innerHTML = thisElement;
        } else {
          itemsFracoList[i].innerHTML = " ";
          itemsFracoList[i + 1].innerHTML = " ";
          break;
        }
      }
      document.querySelector(".xMark").style.display = "block ";
    })
    .catch(function (error) {
      console.log(error);
    });

  return active;
}

function resetSearch() {
  let pokePic = (document.querySelector("#pokePicture").src =
    "img/Poke_Ball.webp");
}

sendButton.addEventListener("click", runCode);
closeBtn.addEventListener("click", resetSearch);
