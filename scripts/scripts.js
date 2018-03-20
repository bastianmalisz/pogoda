//zdobywanie info o lokalizacji, zeby pokazac mape z pogoda
 function pogoda() {
     navigator.geolocation.getCurrentPosition(function (position, info) {
         const latLong = [];
         latLong[0] = position.coords.latitude;
         latLong[1] = position.coords.longitude;
         console.log(latLong[0], latLong[1]);
         let Info;

         let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0]}&lon=${latLong[1]}&units=metric&APPID=1f08d3a7a4d09b2abb92db35a1c70794`
         $.getJSON(api, function (data) {
             console.log(data, data.name)
             
            
             let clouds = data.clouds.all;
             
             let humidity = data.main.humidity;
             
             let pressure = data.main.pressure;
            
             let temperature = data.main.temp;
             // nazwa miasta
             let city = data.name;
             // wschod slonca
             let sunrise = new Date(data.sys.sunrise * 1000);
             let hours = sunrise.getHours();
             let minutes = "0" + sunrise.getMinutes();
             let sunriseH = hours + ':' + minutes.substr(-2);
             //zachod slonca
             let sunset = new Date(data.sys.sunset * 1000);
             let hoursz = sunset.getHours();
             let minutesz = "0" + sunset.getMinutes();
             let sunsetH = hoursz + ':' + minutesz.substr(-2);
             //predkosc wiatru
             let windSpeed = data.wind.speed;
             // kierunek wiatru
             let windDirection = data.wind.deg;
             //opis pogody (np deszcz)
             let weatherDesc = data.weather.description;

             // ustawianie opisu pogody 
             // const opisPogodyNazwa = ["",]
             // rysowanie w aplikacji
             const cityDiv = document.querySelector(".city-name");
             const temperatureDiv = document.querySelector(".temperature");
             const cloudsDiv = document.querySelector(".clouds");
             const humidityDiv = document.querySelector(".humidity");
             const pressureDiv = document.querySelector(".pressure");
             const windInfoDiv = document.querySelector(".wind-info");
             const windIconDiv = document.querySelector(".wind-icon");
             const iconDiv = document.querySelector(".icon");
             const sunriseDiv = document.querySelector(".sunrise");
             const sunsetDiv = document.querySelector(".sunset");

             // ustawienie nazewnictwa zachmurzenia indeksy- 0: 0-20%(zachmurzenia), 1:21-40%, 2:41-60%, 3:61-80% 4:81-100%
             var cloudsNames = ["brak zachmurzenia", "niskie zachmurzenie", "średnie zachmurzenie", "wysokie zachmurzenie", "całkowite zachmurzenie"];
             let cloudsNow = "";
             if ((clouds >= 0) && (clouds < 21)) {
                cloudsNow = cloudsNames[0]
             }
             if (clouds >= 21 && clouds < 41) {
                cloudsNow = cloudsNames[1];
             };
             if (clouds >= 41 && clouds < 61) {
                cloudsNow = cloudsNames[2];
             };
             if (clouds >= 61 && clouds < 81) {
                cloudsNow = cloudsNames[3];
             };
             if (clouds >= 81 && clouds < 100) {
                cloudsNow = cloudsNames[4];
             };
             
             const pressureNames = ["niskie ciśnienie", "umiarkowane ciśnienie", "wysokie ciśnienie"];
             let pressureNow = "";
             if (pressure > 950 && pressure <= 990) {
                pressureNow = pressureNames[0]
             }
             if (pressure > 991 && pressure <= 1005) {
                pressureNow = pressureNames[1]
             }
             if (pressure > 1006 && pressure <= 1050) {
                pressureNow = pressureNames[2]
             }
             console.log("");
             let textToRead1 = 'jesteś w mieście' + data.name + " " + "temperatura wynosi " + temperature + "stopni celsjusza." + "Występuje " + cloudsNow + "Natomiast wiatr wieje z prędkością: " + windSpeed + " metrów na sekundę. Wilgotność powietrza wynosi " + humidity + "%.";
             let textToRead2 = 'Można dziś poczuć' + pressureNow + " o wartości " + pressure + " hektopaskali. Dzien rozpoczął się o godzinie " + sunrise + " natomiast słońce zajdzie o godzinie " + sunset
             const msgWeather1 = new SpeechSynthesisUtterance(textToRead1);
             const msgWeather2 = new SpeechSynthesisUtterance(textToRead2);
             msgWeather1.lang = 'pl-PL';
             msgWeather2.lang = 'pl-PL';
             window.speechSynthesis.speak(msgWeather1);
             window.speechSynthesis.speak(msgWeather2);

             cityDiv.innerHTML = "<span class='przed'>miasto: </span>" + city;
             temperatureDiv.innerHTML = "<span class='przed'>temperatura: </span>" + temperature + "&deg";
             cloudsDiv.innerHTML = "<span class='przed'>zachmurzenie: </span>" + cloudsNow;
             humidityDiv.innerHTML = "<span class='przed'>wilg. powietrza: </span>" + humidity + " %";
             pressureDiv.innerHTML = "<span class='przed'>ciśnienie: </span>" + pressure + " hPa";
             windInfoDiv.innerHTML = "<span class='przed'>wiatr:</span>" + windSpeed + "m/s";
             sunriseDiv.innerHTML = "<i class='em em-sunny'></i><span class='przed'> o godzinie  </span>" + sunriseH;
             sunsetDiv.innerHTML = "<i class='em em-sunrise'></i></i><span class='przed'> o godzinie  </span>" + sunsetH;
             //  obrazy pogody
             const images = ["/pogoda/img/sunny.png", "/pogoda/img/cloudy.png", "/pogoda/img/partly-cloudy.png"];
             if (cloudsNow == "brak zachmurzenia") {
                 Object.assign(iconDiv.style, {
                     background: `url(${images[0]})`,
                     backgroundSize: " contain",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center"
                     
                 });
             }
             if (cloudsNow == "niskie zachmurzenie") {
                 Object.assign(iconDiv.style, {
                     background: `url(${images[2]})`,
                     backgroundSize: " contain",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center"
                     
                 });
             }
             if (cloudsNow == "średnie zachmurzenie") {
                 Object.assign(iconDiv.style, {
                     background: `url(${images[2]})`,
                     backgroundSize: " contain",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center"
                     
                 });
             }
             if (cloudsNow == "wysokie zachmurzenie") {
                 Object.assign(iconDiv.style, {
                     background: `url(${images[1]})`,
                     backgroundSize: " contain",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center"
                     
                 });
             }
             if (cloudsNow == "całkowite zachmurzenie") {
                 Object.assign(iconDiv.style, {
                     background: `url(${images[1]})`,
                     backgroundSize: " contain",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center"
                     
                 });
             }
             windDirection
             Object.assign(windIconDiv.style, {
                 background: `url("/pogoda/img/strzalka-wiatr.png")`,
                 backgroundSize: " 25% 80%",
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "center",
                 transform: `translate(${windDirection}deg)`
                
             });
             // animacja pojawiania sie elementow
             document.querySelector('.magic-word').style.animationName = "schowaj";
             document.querySelector('.word-info').style.animationName = "schowaj";
             cityDiv.style.animationName = "pojaw";
             temperatureDiv.style.animationName = "pojaw";
             cloudsDiv.style.animationName = "pojaw";
             humidityDiv.style.animationName = "pojaw";
             pressureDiv.style.animationName = "pojaw";
             windInfoDiv.style.animationName = "pojaw";
             windIconDiv.style.animationName = "pojaw";
             iconDiv.style.animationName = "pojaw";
             sunriseDiv.style.animationName = "pojaw";
             sunsetDiv.style.animationName = "pojaw";
         });


     });
 }

 window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 const recognition = new SpeechRecognition();
 recognition.interimResults = false;
 recognition.addEventListener('result', e => {
     const transcript = Array.from(e.results)
         .map(result => result[0])
         .map(result => result.transcript)
         .join('')
     textContent = transcript;
     if (transcript.includes('aplikacja pogoda')) {
         pogoda();
     }
 });

 recognition.addEventListener('end', recognition.start);
 recognition.start();