class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("pink");

    textSize(40);
    fill(46,139,87);
    text("RESULT OF THE QUIZ", 225, 50)

    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      var displayPosition = 300;
      textSize(20);
      fill("blue")
      text("NOTE: Names of contestants who answered correctly are marked in green color",50,280)
      for (var plr in allContestants){
        var CA = "2";
        if(CA === allContestants[plr].answer){
          fill("green");
        } else{
          fill("red")
        }
        displayPosition+=20;
        textSize(20);
        text(allContestants[plr].name+": " + allContestants[plr].answer,200,displayPosition)
      } 
    }
   
  }
}
