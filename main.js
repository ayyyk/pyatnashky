let seqElem = []; //sequence of elements in the field
let smallSeq = []; //cells which can be moved in empty cell position
let noElem; //empty сell
let stepCnt = 0;
let counter;

window.onload = function () {
	counter = document.getElementById("counter")
	document.getElementById("restart").onclick = window.onload

	let elem; // element of array "elements", randomly selected
	let elements = ["a1","a2","a3","a4","a5","a6","a7","a8","a9","a10","a11","a12","a13","a14","a15","a16"];
	for (let i=0; i<=15; i++){
		// select element randomly and place it on the field in order
		elem = Math.round(Math.random()*(elements.length-1));
		document.getElementById(elements[elem]).style.order=i+1;	
		seqElem[i] = elements[elem];
		elements.splice(elem, 1); // delete element from the "elements" which was placed 
	};

	noElem = document.getElementById("a16");
	
	setOnClick();
}

function setOnClick (){
	let noElemOrd = noElem.style.order;

	if (noElemOrd>4){
		smallSeq[smallSeq.length] = noElemOrd-5;	
	};

	if (noElemOrd<13){
		smallSeq[smallSeq.length] = +noElemOrd+3;		
	};

	if (![4, 8, 12, 16].includes(+noElemOrd)){
		smallSeq[smallSeq.length] = noElemOrd;
	};

	if (![1, 5, 9, 13].includes(+noElemOrd)){
		smallSeq[smallSeq.length] = noElemOrd-2;
	}; 

	changeEnents(changeOnClick)
}

function changeOnClick(){
	[this.style.order, noElem.style.order] = [noElem.style.order, this.style.order];

	[seqElem[this.style.order-1], seqElem[noElem.style.order-1]] = [seqElem[noElem.style.order-1], seqElem[this.style.order-1]];

	changeEnents(undefined)

	smallSeq = [];

	setOnClick();

	counter.innerHTML = 'step: ' + ++stepCnt;

	if (seqElem.every((elem, index) => (elem.indexOf((+index+1))>=0) ? true : false)){
		alert("Win!")
	}
}

function changeEnents(func){
	for (i = 0; i<smallSeq.length; i++) {
		document.getElementById(seqElem[smallSeq[i]]).onclick = func;
	};
}