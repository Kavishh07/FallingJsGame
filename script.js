//Var variable voor de karakter.
var karakter = document.getElementById("character");
//Var variable voor de game.
var game = document.getElementById("game");
//Var interval zorgt ervoor dat de funtions goed verloopt.
var interval;
//Var both zorgt ervoor dat als je beide arrowkeys in gedrukt zal houden de karakter niet zal glitchen.
var both = 0;
var counter = 0;
//tracked de huidige blocks in de game div
var currentBlocks = [];

//De function beweegLinks zorgt ervoor dat de karakter naar links zal bewegen
function moveLeft(){
    //Var left krijgt de waarde left + 2 + "px" met een if statement.
    var left = parseInt(window.getComputedStyle(karakter).getPropertyValue("left"));
    //De if statement zorgt ervoor dat de karakter niet de game div zal verlaten.
    if(left>0){
        karakter.style.left = left - 2 + "px";
    }
}

//De function beweegRechts zorgt ervoor dat de karakter naar rechts zal bewegen.
function moveRight(){
    //Var left krijgt de waarde left - 2 + "px" met een if statement.
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    //De if statement zorgt ervoor dat de karakter niet de game div zal verlaten.
    if(left<380){
        character.style.left = left + 2 + "px";
    }
}

//De addEventListener keydown zal ervoor zorgen dat je op alle key zal kunnen klikken. 
document.addEventListener("keydown", event => {
    //Met de if statements word er gecheckt of de linker of rechter arrow key gepressed word. Ook als both gelijk is aan 0 zal de de statement runnen.
    if(both==0){
        both++;
        //Met de Arrowleft word ervoor gezorgd dat je naar links kunt bewegen als je op de linker arrowkey drukt.
        if(event.key==="ArrowLeft"){
            //interval zorgt ervoor dat de function goed verloopt.
            interval = setInterval(moveLeft, 1);
        }
        //Met de ArrowRight word ervoor gezorgd dat je naar rechts kunt bewegen als je op de rechter arrowkey drukt.
        if(event.key==="ArrowRight"){
            //interval zorgt ervoor dat de function goed verloopt.
            interval = setInterval(moveRight, 1);
        }
    }
});

//De addEventListener keyup zorgt ervoor dat er als de left or right arrows niet meer ingedrukt zijn onze karakter stopt met bewegen.
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

//Var blocks en daarin worden er meer var variables aan gemaakt.
var blocks = setInterval(function(){
    //Zal steeds -1 gaan.
    var blockLast = document.getElementById("block"+(counter-1));
    //Zal steeds -1 gaan.
    var holeLast = document.getElementById("hole"+(counter-1));
    //if statement met de top van de var blockLastTop & var holeLastTop met in beide blocklast & holelast als top.
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){
        //Nu word er voor de block & hole een var g=aangemaakt met de createlement("div").
        var block = document.createElement("div");
        var hole = document.createElement("div");
        //Er word een class block aangemaakt.
        block.setAttribute("class", "block");
        //Er word een class hole aangemaakt.
        hole.setAttribute("class", "hole");
        //Er word een id block aangemaakt + de var counter=0 .
        block.setAttribute("id", "block"+counter);
        //Er word een id hole aangemaakt + de var counter=0 .
        hole.setAttribute("id", "hole"+counter);

        //Er worden nu steeds nieuwe blocks & holes aangemaakt.
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }

    //2 var variables zijn er aangemaakt voor de karakter top en left.
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;

    // if statements voor als karakter de top aanraakt dan zal de game eindigen.
    if(characterTop <= 0){
        alert("Game is afgelopen. Uw Score is: "+(counter-9) + "Wilt u opnieuw spelen?  Druk dan op OK");
        clearInterval(blocks);

        //pagina zal worden herladen.
        location.reload();
    }

    //Door de for loop zal er steeds blocks en holes aangemaakt worden.
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0;
            }
        }
    }

    //de if else statement zorgt ervoor dat de karakter niet zal vallen uit de game div.
    if(drop==0){
        if(characterTop < 480){
            character.style.top = characterTop + 2 + "px";
        }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
},1);
