const recherche = document.querySelector("#recherche"); 
const resultat = document.querySelector("#resultat");
let lesPays;
let recherchePays = ''; 


//Extraire les donnees 

const fetchPays = async() =>{
	lesPays = await fetch(
		'https://restcountries.eu/rest/v2/all?fields=name;population;flag').then(res => res.json());
	// console.log(lesPays);
};

const voirPays = async() =>{
	await fetchPays(); 
	resultat.innerHTML = (
		lesPays 
			.filter(country => country.name.toLowerCase().includes(recherchePays.toLowerCase()))
			.map(country =>(

				`

<li class="pays-liste">

    <img class="pays-drapeau" src="${country.flag}"/>

    <h3 class="pays-nom">${country.name}</h3>

    <div class="pays-info">
      <h2 class="pays-population">${nombreVirgule(country.population)}</h2>
      <h5 class="pays-text">Habitants</h5>
    </div>

</li>

				`

)).join('')
);
};

voirPays();

recherche.addEventListener('input', (e) =>{
	recherchePays = e.target.value;
	//console.log(e.target.value);

	voirPays();
});



//Ajouter virgule ou point
function nombreVirgule(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
