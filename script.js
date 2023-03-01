let weather = {
    apiKey : "e3faabb24bede81494b7b960db2e27e4",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            +"&units=metric&appid=" 
            + this.apiKey
        )

            .then((response) => response.json())
            
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
        document.getElementById("cityInput").defaultValue =`${name}`;
        GetInfo();

    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
    
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Ploiesti")



function GetInfo(){
    const newName = document.getElementById("cityInput");
   


fetch("https://api.openweathermap.org/data/2.5/forecast?q="+newName.value+"&units=metric&appid=e3faabb24bede81494b7b960db2e27e4")
.then(response => response.json())
.then(data => {
    for(i=0;i<5;i++){
        document.getElementById("day"+(i+1)+"Min").innerHTML = "Min:" + Number(data.list[i].main.temp_min ).toFixed(1)+"°";
    }
    for(i=0;i<5;i++){
        document.getElementById("day"+(i+1)+"Max").innerHTML = "Max:" + Number(data.list[i].main.temp_max ).toFixed(1)+"°";
    }
    
})

.catch(err => alert("Something Went Wrong"))
}



const d = new Date();
const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];


function CheckDay(day){
    if(day +d.getDay() > 6){
        return day + d.getDay()-7;
    }
    else{
        return day + d.getDay();
    }
}

for(i=0;i<5;i++){
    document.getElementById("day"+(i+1)).innerHTML = weekday[CheckDay(i)];
}

