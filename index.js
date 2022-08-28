var colorArray = ["green", "red", "yellow","blue"];
var randomArray =[];
var usrArray = [];
var pointer = 0;
var start = false;
var level = 1;
var nextLevel = false;

$(document).keydown(function(e){
    // startGame();
    
    if (e.keyCode != 93){ //skip ctrl key
        $("#level-title").text("Level "+level);
        if(!start){
            start=true;
            setTimeout(function(){
                
                nextSequence();
            },1000);
            
        }
    }
})


function nextSequence() {
    //check start to avoid more click action made the new random number generate and wrong action occur at the same time
    if(start){
        nextLevel = false;
        var n = Math.random()*4
        n=Math.floor(n);
        randomArray.push(colorArray[n]);
        animationColor(colorArray[n]);
        playSound(colorArray[n]);
        console.log('random '+colorArray[n]);
    }
    
    //輸出隨機數字
}


$(".btn").click(function() {
    var usrChooseColor = $(this).attr("id");
    usrArray.push(usrChooseColor);

    animationColor(usrChooseColor);
    
    if(start && !nextLevel){
        if(checkAns() === true){
            level++;
            $("#level-title").text("Level "+level);
            setTimeout(function(){
                                    
                nextSequence();
                
            },1500);   
            
        }
    }
    else {
        //wrong action and teminate it
        startOver();
    }
    
    
})


function animationColor(currColor) {
    $("#"+currColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currColor).removeClass("pressed");
    },200);

}

function playSound (colorOrEvent){
    switch (colorOrEvent) {
        case 'blue':
            var audio = new Audio('sounds/blue.mp3');
            audio.play();
            console.log("play blue");
            break;
        case 'green':
            var audio = new Audio('sounds/green.mp3');
            audio.play();
            console.log("play green");
            break;
        case 'red':
            var audio = new Audio('sounds/red.mp3');
            audio.play();
            console.log("play red");
            break;
        case 'yellow':
            var audio = new Audio('sounds/yellow.mp3');
            audio.play();
            console.log("play yellow");
            break;
        case 'wrong':
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();
            console.log("play wrong");
            break;
    }
}

function startOver(){
    playSound("wrong");
    $("body").addClass('game-over');
        setTimeout(function(){
            $("body").removeClass('game-over');
        },200);
    
    $("#level-title").text("Press A Key to Start");
    
    // reset all var
    randomArray = [];
    pointer = 0;
    usrArray = [];
    start = false;
    level=1;

}

function checkAns(usrChooseColor){
   
    if (randomArray[pointer] === usrArray[pointer] && pointer <= randomArray.length){
        playSound(randomArray[pointer]);        
        if(pointer+1 === randomArray.length){
            pointer=0;
            usrArray = [];
            nextLevel = true; //already check ans, what if there are more action, that will be the wrong action
            return true;
        }
        else{
            pointer++;
            
        }
    }
    else{
        startOver();
        return false;
    }
}

