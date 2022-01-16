
function Pokemon(pkname, pktype, pktype2, pkheight, pkweight, pkimage){

    // Je crée un nouvel élément div
    var div = document.createElement('div');
    var name = document.createElement('h2');
    var type = document.createElement('p');
    var type2 = document.createElement('p');
    var height = document.createElement('p');
    var weight = document.createElement('p');
    var img = document.createElement('img');

    // et lui donne un peu de contenu

    var newName = document.createTextNode(pkname);
    var newType = document.createTextNode(pktype);
    var newType2 = document.createTextNode(pktype2);
    var newHeight = document.createTextNode(pkheight);
    var newWeight = document.createTextNode(pkweight);

    //Je crée des div avec leur noms
    img.setAttribute('src' , pkimage )
    type.setAttribute('class', 'pktype')
    weight.setAttribute('class', 'weight')
    height.setAttribute('class', 'height')
    name.setAttribute('class', 'pkname')
    div.setAttribute('class', 'Pokemon')
    // Ajoute le nœud texte au nouveau div créé
    
    name.appendChild(newName);
    type.appendChild(newType);
    type2.appendChild(newType2);
    height.appendChild(newHeight);
    weight.appendChild(newWeight);
    div.appendChild(name);
    div.appendChild(img);
    div.appendChild(type);
    div.appendChild(type2);
    div.appendChild(height);
    div.appendChild(weight);

    // Ajoute le nouvel élément créé et son contenu dans le DOM
    var currentDiv = document.getElementById('Pokemons');
    currentDiv.appendChild(div);

    //Je crée une constante qui va chercher attribuer la couleur en fonction du type
    const color = colors[pktype];

    //Avec la fonction du dessus je met un background color sur la div pour que la couleur attribueé au type s'actionne
    div.style.backgroundColor = color ;

}

function search_pokemon() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let type = document.getElementsByClassName('pktype');
    let name = document.getElementsByClassName('pkname');
    let container = document.getElementsByClassName('Pokemon');
    
    for (i = 0; i < name.length; i++) { // Pour chaque Pokemon :
        if (!name[i].innerHTML.toLowerCase().includes(input)){ // Si le pokémon ne correpond pas avec le pokémon les lettres présentes dans l'input

            if(!type[i].innerHTML.toLowerCase().includes(input)) { // Si le type ne correspond pas avec les lettres présentes dans l'input
                container[i].style.display="none"; // Ne pas afficher la div du pokémon 
            }
        }
        else {
            container[i].style.display="flex";    // Sinon, afficher la div (obligatoire sinon ne réapparait pas)
        }
    }
}

function fetchPokemon() {
    //Je prends tout les Pokémons de l'api 
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then((res) => res.json())
    .then((data) => {
        data.results.forEach(element => {
             //Je prends un seul Pokémon
            fetch(element.url)
            .then((res) => res.json())
            .then((datasingle) => {
                if (datasingle.types[1] === undefined){
                    var secondtype = "";
                }
                else {
                    var secondtype = datasingle.types[1].type.name;

                }
                Pokemon(datasingle.name, datasingle.types[0].type.name , secondtype, "Height : " + datasingle.height /10 + "m", "Weight : " + datasingle.weight /10 + "kg",  datasingle.sprites.front_default)
                
            })
        })
    })
};


//Je créeais une constance avec toutes mes couleurs pour chaque types

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
    ice : '#cffaff',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
    ghost: '#c79cf2',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};


fetchPokemon()