//let card = document.getElementsByClassName("card");
let currentCard;
let card_object = [];
const cards = document.querySelectorAll(".card");
let cardNum = 0;
let deck = [];
let deckNum = 0;
const shuffleTimes = 200;
const players = 2;

let turn = 0;

let flippedCard = 1;
let turnNumber = 1;


const cardContainer = document.querySelectorAll(".content")

const butt = document.querySelector(".resetBtn");
let used = [];

///             !!!FUNCTIONS!!!

// checks if card has match in used[]
function checkCard(card) {
    if (used.length != 0){
        for (let index = 0; index < used.length; index++) {
            if(card == used[index]){
                return true;
            }
        }
    }
    return false
}

//all cards face down
function shutCard() {
    cards.forEach(Element => {
        //console.log(Element.getAttribute("src"));
        if(Element.getAttribute("src") != "sprites/back.png"){
            flipB(Element);
        }
    })
}

function findCardfromNum(number){
    card_object.forEach(element => {
        if(element.number == number){
            //console.log("returning Element")
            return element
        }
    });
    return false
}

function findNumFromCard(){

}

function findMirror(number){
    console.log("looking for mirror")
    if(number <= 12) {
        number = number + 13;
        //console.log("was red +13")
    }
    else if(number <= 25) {
        number = number - 13;
        //console.log("was red -13")
    }
    else if(number <= 38) {
        number = number + 13;
        //console.log("was black +13")
    }
    else if(number <= 51) {
        number = number - 13;
        //console.log("was black -13")
    }
    //console.log("number is: " + number)

    //let this_card = findCardfromNum(number);
    //console.log("found card: " + number)
    return number;

}


function shuffleDeck(){
    console.log("Not FINAL DECK : " + deck);
    console.log("started shuffle!!!!!!!!!!!!");
    for (let index = 0; index < shuffleTimes; index++) {
        let temp = 0;
        let random = randomInt(numOfCards);
        //console.log("card1 = " + random);
        let card1 = random;
        random = randomInt(numOfCards);
        //console.log("card2 = " + random);
        let card2 = random;
        
        temp = deck[card1];
        //console.log("temp = " + temp);
        deck[card1] = deck[card2];
        //console.log("card1 = " + deck[card1]);
        deck[card2] = temp;
        //console.log("card2 = " + deck[card2]);
        
    }
}

function isCopy(number) {
    used.forEach(element => {
        let momo = element;
        //console.log(momo + "!!")
        if(number == momo) {
            //console.log("match!")
            return true
        }
    })
    //console.log("it is false")
    return false;
}

function randomInt(maxNum) {
    let randomNum
    
    randomNum = Math.floor(Math.random() * maxNum)
    if(isCopy(randomNum)){
        randomInt(maxNum)
        return randomNum
    }
    return randomNum;
}
/*
function checkMatch(card){
    if(flippedCard == 2){
        if(findMirror(card)){
            
        }
    }
}*/
let pointsG1 = 0;
let pointsG2 = 0;
let savedCard1 = 0;
let savedCard2 = 0;


function checkMatchTest(card){
    savedCard1 = card;
    console.log(savedCard1.number);
}



function checkMatch(card){
    if (flippedCard == 1){
        savedCard1 = card.number;
        console.log("card one saved")
        flippedCard += 1;
    }else if(flippedCard == 2){
        savedCard2 = card.number;
        console.log("card two saved")
        let mirror = findMirror(savedCard2)
        if(savedCard1 == mirror){
            console.log("they are the same 1 point added")
            addPoints(1);
            flippedCard = 1;
            console.log("scored a point")
        }else{
            flippedCard = 1;
            turn += 1;
            if (turn == 3){
                turn = 1
            }
            console.log("change turn")
        }
        }else if(flippedCard == 3){
        flippedCard = 1;
    }
    console.log("flipped card number: " + flippedCard + "\n" +
    "turn number: " + flippedCard + "\n" + 
    "saved card number:" + card.number)
}

function addPoints(numPoints){
    if (turn == 0){
        pointsG1 += numPoints;
    }else if (turn == 1){
        pointsG2 += numPoints;
    }
    console.log("G1 Points: " + pointsG1 + "\nG2 Points: " + pointsG2)
}


function flip(currentCard){
    let card = currentCard;
    console.log("turning card............")
    checkMatch(card);
    if(!card.classList.contains("flip") && !card.src.includes(card.id)) {
        flippedCard += 1;
        card.classList.add("flip");
        setTimeout(function(){
                card.src = card.id;
        }, 800);
        setTimeout(function(){card.classList.remove("flip")}, 1500)
    }
}
//flip back
function flipB(currentCard){
    let card = currentCard;
    if(!card.classList.contains("flip")){
        card.classList.add("flip");

        setTimeout(function(){
            if(card.src.includes(card.id)) {
                card.src="sprites/back.png"
            }
        }, 800);
    }
    setTimeout(function(){card.classList.remove("flip")}, 1500)
}

///             !!!FUNCTIONS!!!




butt.addEventListener("click", shutCard)
//naming numbering and adding src to each card
let n = 1;
for (let index = 0; index < 52; index++) {
    
    if(index <= 12) {
        card_object[index] = {
        number: index,
        name: "hearts" + n,
        src: "hearts_" + n + ".png"
        }
    }
    else if(index <= 25) {
        card_object[index] = {
        number: index,
        name: "diamonds" + n,
        src: "diamonds_" + n + ".png"
        }
    }
    else if(index <= 38) {
        card_object[index] = {
        number: index,
        name: "clubs" + n,
        src: "clubs_" + n + ".png"
        }
    }
    else if(index <= 51) {
        card_object[index] = {
        number: index,
        name: "spades" + n,
        src: "spades_" + n + ".png"
        }
    }
    if (n < 13) {n++;}
    else { n = 1;}
}

//count Number of Cards
let numOfCards = 0;
cards.forEach(Element => {
    numOfCards += 1
    console.log("number of cards counted:" + numOfCards)
})
console.log("there are" + numOfCards + "card/s")


//get num of pairs and make deck of pairs
let numOfPairs = numOfCards/2;
// PAIRS CONFIRMED!! console.log("number of pairs is: " + numOfPairs)
console.log("Pairing cards....")


for (let index = 0; index < numOfPairs; index++) {
    console.log("searching card: " + index)
    let randomNum
    do {
        randomNum = Math.floor(Math.random() * 51);
        console.log("searching card....")
    }
    while (checkCard(randomNum));
    //console.log("found match")

    deck.push(randomNum);
    //console.log("inserted in deck: " + deck)
    used.push(randomNum);
    let mirror = findMirror(randomNum);
    //console.log("found mirror match")
    deck.push(mirror);
    used.push(mirror);
    //console.log("inserted mirror in deck")
}

//  functino find card from number
shuffleDeck()

//event listener(click to flip) to each card
//cardSrc assignment
cards.forEach(Element => {
    Element.addEventListener("click", function(){flip(Element)});
    let temp = deck[cardNum]
    let usedCard = card_object[temp];
    cardNum += 1;
    let cardSrc = "sprites/front/" + usedCard.src;
    Element.src = "sprites/back.png";
    Element.id = cardSrc;
    Element.number = temp;
})

console.log("FINAL DECK: " + deck);

