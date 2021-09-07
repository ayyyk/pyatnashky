//sequence of elements in the field
let seqElem = ["a1","a2","a3","a4","a5","a6","a7","a8","a9","a10","a11","a12","a13","a14","a15","a16"]; 
let smallSeq = []; //cells which can be moved in empty cell position
let noElem; //empty сell
let stepCnt = 0;
let counter;
let newgame = false;

window.onload = function () {
	counter = document.getElementById("counter")
	document.getElementById("restart").onclick = mixin

	seqElem.forEach(function(item, index){
		document.getElementById(item).style.order=index+1;
	});

	noElem = document.getElementById("a16");
	
	setOnClick();	
}

let mixin = function(){
	window.onload()

	newgame = false;
	let elem
	for (let i = 0; i<20000; i++){
		elem = Math.round(Math.random()*(smallSeq.length-1));
		let click = document.getElementById(seqElem[smallSeq[elem]]).onclick()
	}

	newgame = true;
	stepCnt = 0
	counter.innerHTML = 'step: 0';
}

function setOnClick (){
	let noElemOrd = noElem.style.order;

	if (noElemOrd>4) smallSeq.push(noElemOrd-5);

	if (noElemOrd<13) smallSeq.push(+noElemOrd+3);

	if (![4, 8, 12, 16].includes(+noElemOrd)) smallSeq.push(noElemOrd);

	if (![1, 5, 9, 13].includes(+noElemOrd)) smallSeq.push(noElemOrd-2); 

	changeEnents(changeOnClick)
}

function changeOnClick(){
	[this.style.order, noElem.style.order] = [noElem.style.order, this.style.order];

	[seqElem[this.style.order-1], seqElem[noElem.style.order-1]] = [seqElem[noElem.style.order-1], seqElem[this.style.order-1]];

	changeEnents(undefined)

	smallSeq = [];

	setOnClick();

	if (newgame) counter.innerHTML = 'step: ' + ++stepCnt;

	if (newgame&&(seqElem.every((elem, index) => (elem.indexOf((+index+1))>=0) ? true : false))){
		newgame = false
		alert("Win!")
		
	}
}

function changeEnents(func){
	smallSeq.forEach(function(item){
		document.getElementById(seqElem[item]).onclick = func;
	});
}