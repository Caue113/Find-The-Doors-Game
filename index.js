player = {
    "health": 10,
    "keys": 0,
}

remaingCards={
    "traps" : 10,
    "keys" : 5,
    "doors" : 5
}

let cardsArea = document.getElementById("cardsArea");
let backpack = document.getElementById("backpack-keys");
let playerLifeBar = document.getElementById("lifes");
let playerLife = playerLifeBar.getElementsByTagName("span")[0];

function Start(){
    //Instantiate all 20 cards
    InstantiateCards();

}

function InstantiateCards(){
    //Magic numbers: Check game rules in index.html
    let traps = 10;
    let doors = 5;
    let keys = 5;
    //Create all 20 cards

    
    for (let i = 0; i < 20; i++) {        
        let cardLoaded = false;

        //Instance card
        card = document.createElement("div");
        card.addEventListener("click", CardClick);
        //Apply the needed styles
        card.classList.add("card");
        card.classList.add("card-active");
        
        //Forces the current card to get a classification
        while(!cardLoaded){
            //Get random integer number.
            rng = Math.floor(Math.random() * 10);

            //Classification
            if(rng <= 3)
            {
                if(traps > 0)
                {
                    traps--;    
                    card.classList.add("card-trap");
                    cardLoaded = true;
                }

            }else if(rng > 3 && rng <= 6)
            {
                if(doors > 0)
                {
                    doors--;
                    card.classList.add("card-door");
                    cardLoaded = true;
                }
            }else
            {
                if(keys > 0){
                    keys--;
                    card.classList.add("card-key")
                    cardLoaded = true;
                }
            }
        }


        //Append the new card to the cards area
        cardsArea.append(card);
    }
}


function CardClick(){

    RevealCard();

    //Check what type of card this instance is    
    if(this.classList.contains("card-trap")){
        console.log("this is a trap card");

        //Magic number 3: Traps take 3 lives from player
        AddPlayerHealth(-3);
        DeactivateCard(this);
        remaingCards.traps--;
    }

    if(this.classList.contains("card-door")){
        console.log("this is a door card");

        if(player.keys > 0){
            console.log("You opened a door!");
            //To-do Make card unclickable

            //Magic number 2: Check game rules about life regen
            AddPlayerHealth(2);
            RemoveKey();
            UpdateBackpackKeys();

            DeactivateCard(this);
            remaingCards.doors--;
        }
    }

    if(this.classList.contains("card-key")){
        console.log("this is a key card");
        
        //Check to see if the card should be inactivated by player key limit
        if(CanPickupKey()){
            AddKey();
            UpdateBackpackKeys();

            DeactivateCard(this);
            remaingCards.keys--;
        }
    }


    CheckGameConditions();

}

function RevealCard(){
    //Animaçao girar carta
    //Ler do array a posicao da carta --> Aplicar estilo correspondente
    //E.g: ["key", "trap", "door"] --> click 1st --> style.add("card-key")

}

//Make card unclickable and grayied out
function DeactivateCard(thisCard){
    thisCard.removeEventListener("click", CardClick);
    thisCard.classList.remove("card-active");
    thisCard.classList.add("card-inactive");
}


function CanPickupKey(){
    //Magic number: max number of keys is 4
    if(player.keys + 1 > 4)
    {
        console.log("YOU CAN'T CARRY ANY MORE KEYS!");
        return false;
    }else{
        return true;
    }
}

function AddKey(){    
    //Only 1 key must be added at once.
    player.keys++;
}

function RemoveKey(){

    if(player.keys - 1 < 0){
        console.log("Cannot have less than 0 keys")
        return;
    }

    player.keys--;
}

function UpdateBackpackKeys(){
    
    //Array.from --> Converts HTML DOM format to a common array
    //Clears the entire backpack
    Array.from(backpack.getElementsByClassName("key")).forEach(element => {
        element.remove();
    });

    //Create key instance and apply style.
    //Must be inside "for loop" to create multiple instances
    for (let i = 0; i < player.keys; i++) {
        let key = document.createElement("div");
        key.classList += "key";

        backpack.append(key);
    }
}

function AddPlayerHealth(healthAdded){
    player.health += healthAdded;

    if(player.health > 10){
        player.health = 10
    };

    UpdatePlayerHealth();
}

function UpdatePlayerHealth(){
    
    if(player.health <= 0)
    {
        playerLife.innerText = "Morto";
    }else
    {
        playerLife.innerText = `${player.health.toString()} / 10`
    }
}


//Either win or lose
function CheckGameConditions(){
    
    //Derrota
    if(player.health <= 0){
        console.log("Voce perdeu");

        //To-do
        //Show base screen
        //Show defeat content over screen
    }

    //Vitoria
    if(remaingCards.doors == 0){
        console.log("Você ganhou!");

        //To-do
        //Show base screen
        //Show win content over screen
    }
}

//Either alive or dead
function CheckPlayerConditions(){

}


