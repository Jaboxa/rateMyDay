//göra divarna clickbara. När man klickar sätts ett var p. och ett objekt skapas. XXX
//om man trycker på skratta ska 20 p sparas, om leende 15 poäng, om meh 10 p, om sad 5 p. XXX
//gör en tidstämpel XXXXX
//gör tidstämpeln fin XXXX
//skapa ett objekt med ett nummer och en tidstämpel XXXXXX
//fixa så att att det enda som ändras är p. Alltså bryt ut tidsstämpeln till en funktion XXXX
//tidsstämpeln har bryts ut men det är fortfarande för mkt som upprepas. Gör så att det är bara p som sätts i de olika onclick. XXXXX
//fixa objektet så det har en konstruktor så man kan göra många. Och sen ska den vara i en array XXXX
//gör en array med object XXXXX
//lägg in objekten i en lista XXXX
//dekorera listan med bakgrundsfärger. XXXXX
//gör två divar en med emojis i en och listan i den andra bredvid. Nedanför visar man graferna 
//arrayen med objekten ska sparas i en databas. Koppla med firebas?
//datan sparad ska visas grafiskt. använd graph.js XXXX
//måste spara datan i olika staplar. typ alla glada adderas till ett värde. Måste tänka som statistik. Delvis som en array så man kan
//gör en linje med punkter men också adderas så man kan göra ett pajdiagram
//pajdiagram XXXX
//behöver en array med en tidslinje också 
//save in browser, then download as txt file or sim. and then the option to put it back up, upload it? So they can see the graph, if its 
//lots of data
//försök med localStorage. allt sparas i browsern men säkert helt osäkert. men om det bara är hos sig själv spelar det kanske ingen roll?
//local storage verkar bra men vi måste serialize objectet (dvs rate+timestamp) se bokmärkt sida
//gör en databas som verkar vara kvar i browsern? För bra för att vara sant. Sparar siffrorna.
//hur många gånger man klickat på något, alltså så man får ett cirkeldiagram 
//en graf med värde över tid. värde på y och tid på x så man får se hur man mått. För grafen över tid måste man
//ha ett objekt med tid och betyg. Då använder jag mig av indexedDB. så bäst
//måste wrappa all kod i onpageload eller liknande så det inte blir fel. 
//men om man clearar browserdatan så försvinner den. man kan ju lägga till en "download" knapp.
//göra en linjär graf med med tid

let p = 0, nHappy = 0, nOk = 0, nMeh = 0, nSad = 0, time = "",formatted_time = "", emotion = {}, emotions = [], h = "", m = "",
s = "", sumTimesClicked = 0, datesArray = [], happyArray = [], addHappyArray = [], okArray =
[], addOkArray = [], mehArray = [], addMehArray = [], sadArray = [], addSadArray = [];

let reducer = (accumulator, currentValue) => accumulator + currentValue;

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function timestamp(){

	time = new Date($.now());
	h = addZero(time.getHours());
  	m = addZero(time.getMinutes());
  	s = addZero(time.getSeconds());
	formatted_time =  h + ":" + m + ":" + s + " " + time.getDate() + "-" + (time.getMonth() + 1) + "-" + time.getFullYear();
	return formatted_time;
}

function printEmotions(){
		for (var i = 0; i < emotions.length; i++) {
		console.log(emotions[i]);
	}
}

function setEmotionAddEmotiontoEmotions(p,formatted_time){
	let emotion = {
  	rate: p,
  	time: formatted_time
	};

	if (p===20){
		$("ul").append("<li class='happy'>" + emotion.time + " " + emotion.rate + "</li>");
		happyArray.push(emotion);
		// for (var i = 0; i < happyArray.length; i++) {
		// console.log(happyArray[i]);
		// }
		addHappyArray.push(p);
		sumHappy = addHappyArray.reduce(reducer);
		console.log(sumHappy);
		//sumhappy och de andra är för att vi ska kunna räkna medelvärde sen

	} else if (p===15){
		$("ul").append("<li class='ok'>" + emotion.time + " " + emotion.rate + "</li>");
		okArray.push(emotion);
		// for (var i = 0; i < okArray.length; i++) {
		// console.log(okArray[i]);
		// }
		addOkArray.push(p);
		sumOk = addOkArray.reduce(reducer);
		console.log(sumOk);
		
	} else if (p===10){
		$("ul").append("<li class='meh'>" + emotion.time + " " + emotion.rate + "</li>");
		mehArray.push(emotion);
		// for (var i = 0; i < mehArray.length; i++) {
		// console.log(mehArray[i]);
		// }
		addMehArray.push(p);
		sumMeh = addMehArray.reduce(reducer);
		console.log(sumMeh);
		
	} else if (p===5){
		$("ul").append("<li class='sad'>" + emotion.time + " " + emotion.rate + "</li>");
		sadArray.push(emotion);
		// for (var i = 0; i < sadArray.length; i++) {
		// console.log(sadArray[i]);
		// }
		addSadArray.push(p);
		sumSad = addSadArray.reduce(reducer);
		console.log(sumSad);
	};
	emotions.push(emotion); 
}

$( "#emojiBoxHappy" ).on( "click", function() {
	p = 20;
	nHappy++;
	setEmotionAddEmotiontoEmotions(p, timestamp());
});

$( "#emojiBoxOk" ).on( "click", function() {
  	p=15;
  	nOk++;
  	setEmotionAddEmotiontoEmotions(p, timestamp());
});

$( "#emojiBoxMeh" ).on( "click", function() {
  	p=10;
  	nMeh++;
  	setEmotionAddEmotiontoEmotions(p, timestamp());
});

$( "#emojiBoxSad" ).on( "click", function() {
  	p=5;
  	nSad++;
  	setEmotionAddEmotiontoEmotions(p,  timestamp());
});

$( "#pieChartButton" ).on( "click", function() {
printEmotions();
let ctx = document.getElementById('pieChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Happy', 'Ok', 'Meh', 'Sad'],
        datasets: [{
            label: 'emojipie',
            backgroundColor: ['#64C7FF','#5BFF62','#FFF851','#F85C50'],
            data: [nHappy, nOk, nMeh, nSad]
        }]
    },
    options: {}
	});
});



// new Chart(document.getElementById("lineChart"), {
//   type: 'line',
//   data: {
//     labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
//     datasets: [{ 
//         data: [86,114,106,106,107,111,133,221,783,2478],
//         label: "Africa",
//         borderColor: "#3e95cd",
//         fill: false
//       }, { 
//         data: [282,350,411,502,635,809,947,1402,3700,5267],
//         label: "Asia",
//         borderColor: "#8e5ea2",
//         fill: false
//       }, { 
//         data: [168,170,178,190,203,276,408,547,675,734],
//         label: "Europe",
//         borderColor: "#3cba9f",
//         fill: false
//       }, { 
//         data: [40,20,10,16,24,38,74,167,508,784],
//         label: "Latin America",
//         borderColor: "#e8c3b9",
//         fill: false
//       }, { 
//         data: [6,3,2,2,7,26,82,172,312,433],
//         label: "North America",
//         borderColor: "#c45850",
//         fill: false
//       }
//     ]
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'World population per region (in millions)'
//     }
//   }
// });
// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }











