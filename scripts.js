 //zdobywanie info o lokalizacji, zeby pokazac mape z pogoda
 function pogoda(){
    navigator.geolocation.getCurrentPosition(function(position, info) {
            const latLong = [];
            latLong[0] = position.coords.latitude;
            latLong[1] = position.coords.longitude;
            console.log(latLong[0],latLong[1]);
            let Info;
  
            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0]}&lon=${latLong[1]}&units=metric&APPID=1f08d3a7a4d09b2abb92db35a1c70794`
            $.getJSON(api,function(data){
              console.log(data,data.name)
              //info z tego programu o pogodzie:
              // clouds - zachmurzenie podane w %;
              let zachmurzenie = data.clouds.all;
              // humidity - wilgotnosc podana w %;
              let wilgotnosc = data.main.humidity;
              // pressure - cisnienie w HpA
              let cisnienie = data.main.pressure;
              // temperatura
              let temperatura = data.main.temp;
              // nazwa miasta
              let miasto = data.name;
              // wschod slonca
              let wschod = new Date(data.sys.sunrise*1000);
              let hours = wschod.getHours();
              let minutes = "0" + wschod.getMinutes();
              let wschodSlonca = hours + ':' + minutes.substr(-2);
              //zachod slonca
              let zachod = new Date(data.sys.sunset*1000);
              let hoursz = zachod.getHours();
              let minutesz = "0" + zachod.getMinutes();
              let zachodSlonca = hoursz + ':' + minutesz.substr(-2);
              //predkosc wiatru
              let szybkoscWiatru = data.wind.speed;
              // kierunek wiatru
              let kierunekWiatru = data.wind.deg;
              //opis pogody (np deszcz)
              let opisPogody = data.weather.description;
  
              // ustawianie opisu pogody 
              // const opisPogodyNazwa = ["",]
             // rysowanie w aplikacji
             const miastoDiv = document.querySelector(".nazwa-miasta");
             const temperaturaDiv = document.querySelector(".temperatura");
             const zachmurzenieDiv = document.querySelector(".zachmurzenie");
             const wilgotnoscDiv = document.querySelector(".wilgotnosc");
             const cisnienieDiv = document.querySelector(".cisnienie");
             const wiatrInfoDiv = document.querySelector(".wiatr-info");
             const wiatrIconDiv = document.querySelector(".wiatr-icon");
             const ikonaDiv = document.querySelector(".ikona");
             const wschodDiv = document.querySelector(".wschod-godzina");
             const zachodDiv = document.querySelector(".zachod-godzina");
             
            // ustawienie nazewnictwa zachmurzenia indeksy- 0: 0-20%(zachmurzenia), 1:21-40%, 2:41-60%, 3:61-80% 4:81-100%
             var zachmurzenieNazwa = ["brak zachmurzenia","niskie zachmurzenie","średnie zachmurzenie","wysokie zachmurzenie","całkowite zachmurzenie"];
            let terazZachmurzenie="";
              if((zachmurzenie >= 0) && (zachmurzenie < 21)){terazZachmurzenie = zachmurzenieNazwa[0]}
              if(zachmurzenie >= 21 && zachmurzenie <41){terazZachmurzenie = zachmurzenieNazwa[1];};
              if(zachmurzenie >= 41 && zachmurzenie <61){terazZachmurzenie = zachmurzenieNazwa[2];};
              if(zachmurzenie >= 61 && zachmurzenie <81){terazZachmurzenie = zachmurzenieNazwa[3];};
              if(zachmurzenie >= 81 && zachmurzenie <100){terazZachmurzenie = zachmurzenieNazwa[4];};
              // opis slowny cisnienia 
              const cisnienieNazwa = ["niskie ciśnienie","umiarkowane ciśnienie","wysokie ciśnienie"];
              let terazCisnienie="";
              if(cisnienie>950 && cisnienie <= 990){terazCisnienie = cisnienieNazwa[0]}
              if(cisnienie>991 && cisnienie <= 1005){terazCisnienie = cisnienieNazwa[1]}
              if(cisnienie>1006 && cisnienie <= 1050){terazCisnienie = cisnienieNazwa[2]}
              console.log("");
              let tekstDoCzytania1 = 'jesteś w mieście'+data.name+" "+"temperatura wynosi "+temperatura+"stopni celsjusza."+"Występuje "+terazZachmurzenie+"Natomiast wiatr wieje z prędkością: "+szybkoscWiatru+" metrów na sekundę. Wilgotność powietrza wynosi "+wilgotnosc+"%.";
              let tekstDoCzytania2 = 'Można dziś poczuć'+terazCisnienie+" o wartości "+cisnienie+" hektopaskali. Dzien rozpoczął się o godzinie "+wschodSlonca+" natomiast słońce zajdzie o godzinie "+zachodSlonca;
              const msgPogoda1 = new SpeechSynthesisUtterance(tekstDoCzytania1);
              const msgPogoda2 = new SpeechSynthesisUtterance(tekstDoCzytania2);
              msgPogoda1.lang = 'pl-PL';
              msgPogoda2.lang = 'pl-PL';
              window.speechSynthesis.speak(msgPogoda1);
              window.speechSynthesis.speak(msgPogoda2);
              
              miastoDiv.innerHTML="<span class='przed'>miasto: </span>"+miasto;
             temperaturaDiv.innerHTML ="<span class='przed'>temperatura: </span>"+ temperatura +"&deg";
             zachmurzenieDiv.innerHTML ="<span class='przed'>zachmurzenie: </span>"+ terazZachmurzenie;
             wilgotnoscDiv.innerHTML ="<span class='przed'>wilg. powietrza: </span>"+ wilgotnosc + " %";
             cisnienieDiv.innerHTML ="<span class='przed'>ciśnienie: </span>"+ cisnienie + " hPa";
             wiatrInfoDiv.innerHTML ="<span class='przed'>wiatr:</span>"+ szybkoscWiatru + "m/s";
              wschodDiv.innerHTML ="<i class='em em-sunny'></i><span class='przed'> o godzinie  </span>"+ wschodSlonca;
              zachodDiv.innerHTML ="<i class='em em-sunrise'></i></i><span class='przed'> o godzinie  </span>"+ zachodSlonca;
            //  obrazy pogody
             const obrazy = ["/pogoda/img/sunny.png","/pogoda/img/cloudy.png","/pogoda/img/partly-cloudy.png"];
              if(terazZachmurzenie == "brak zachmurzenia"){
                Object.assign(ikonaDiv.style,{
                  background: `url(${obrazy[0]})`,
                  backgroundSize:" contain",
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"center"
                  // left:"200px",
                    });
              }
              if(terazZachmurzenie == "niskie zachmurzenie"){
                Object.assign(ikonaDiv.style,{
                  background: `url(${obrazy[2]})`,
                  backgroundSize:" contain",
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"center"
                  // left:"200px",
                    });
              }
              if(terazZachmurzenie == "średnie zachmurzenie"){
                Object.assign(ikonaDiv.style,{
                  background: `url(${obrazy[2]})`,
                  backgroundSize:" contain",
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"center"
                  // left:"200px",
                    });
              }
              if(terazZachmurzenie == "wysokie zachmurzenie"){
                Object.assign(ikonaDiv.style,{
                  background: `url(${obrazy[1]})`,
                  backgroundSize:" contain",
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"center"
                  // left:"200px",
                    });
              }
            if(terazZachmurzenie == "całkowite zachmurzenie"){
                Object.assign(ikonaDiv.style,{
                  background: `url(${obrazy[1]})`,
                  backgroundSize:" contain",
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"center"
                  // left:"200px",
                    });
              }
              kierunekWiatru
              Object.assign(wiatrIconDiv.style,{
                  background: `url("/pogoda/img/strzalka-wiatr.png")`,
                  backgroundSize:" 25% 80%",
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"center",
                  transform: `translate(${kierunekWiatru}deg)`
                  // left:"200px",
                    });
            // animacja pojawiania sie elementow
            document.querySelector('.komenda-slowo').style.animationName = "schowaj";
            document.querySelector('.komenda-info').style.animationName = "schowaj";
             miastoDiv.style.animationName = "pojaw";
             temperaturaDiv.style.animationName = "pojaw";
             zachmurzenieDiv.style.animationName = "pojaw";
             wilgotnoscDiv.style.animationName = "pojaw";
             cisnienieDiv.style.animationName = "pojaw";
             wiatrInfoDiv.style.animationName = "pojaw";
             wiatrIconDiv.style.animationName = "pojaw";
             ikonaDiv.style.animationName = "pojaw";
             wschodDiv.style.animationName = "pojaw";
             zachodDiv.style.animationName = "pojaw";
            });
           
           
          });  
    }
    
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.interimResults = false;
      recognition.addEventListener('result', e =>{
          const transcript = Array.from(e.results)
            .map( result => result[0])
            .map( result => result.transcript)
            .join('')
            textContent = transcript;
            if(transcript.includes('aplikacja pogoda')){
              pogoda();
            }
    });
      
      recognition.addEventListener('end', recognition.start);
      recognition.start();