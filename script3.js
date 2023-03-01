let cities =[]


const cityListElement = document.querySelector("#city-list");
const cityInputElement = document.querySelector("#city-input");



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bf68c25babmsh2ad973ed090501ap1acc5djsn6f64072c6029',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};


function fetchCities() {
    fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000` , options)
        .then((response) => response.json())
        .then((response) => {
            cities = response.data.map((city) => city.name);
            cities.sort();

            loadData(cities ,cityListElement);
            console.log(cities);
        })
        .catch(err => console.error(err)); 
}

function loadData(data, element) {
    if(data) {
        element.innerHTML ="";
        let innerElement ="";
        data.forEach((item) => {
            innerElement += `
            <option value= "${item}">` ;
        });
        element.innerHTML = innerElement;
    }
}


function filterData(data,searchText) {
    return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()))
    ;
}


fetchCities()

cityInputElement.addEventListener("input", function() {
    const filteredData = filterData(cities, cityInputElement.value);
    loadData(filteredData, cityListElement);
});

