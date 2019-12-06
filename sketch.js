let obj;
let par="";

let objList;
let article, tempObj;

let timerP;

let curMin;

let initMegaMin;
let megaMin;

let database,ref;

let button;

let previousObjs=[];

let objData = [];

let prevPs = [];

let successPar;

let finalTime;

function preload(){
 
  objList = loadStrings("objets.txt");
  
  
  
}

function chooseObj(){
  tempObj = random(objList);
  
  if(tempObj[0] == "a" || tempObj[0] == "e" ||tempObj[0] == "i" || tempObj[0] == "o" || tempObj[0] == "u"){
    
    article = "an " ;
  } else {
    article = "a ";
  }
  
  obj = article + tempObj;
  print(obj);
}

function createPars()
{
    chooseObj();
  
  initMegaMin = minute() + (hour() *60) + (day()*60*24);
  
  elapsedTime = 0;
  
  par="";
  
  par+="Today, if you'd like, you'll go on a walk. You can start wherever you are right now, just walk outisde";
  
  createP(par);
  
  par = ""
  
  ////
  
  //obj = "a bench";
  
  par +="Today's walk is all about finding "
  par += obj + "."
  
  par +=" ";
  
  createP(par);
  
  ////
  
  par="";
  
  par+="";
  
  par+="Do not go to a place where you know there is ";
  par += obj + ".";
  
  createP(par);
  
  ////
  
  par="";
  
  par+="";
  
  par+="Do not go to a place where you think you might have a better chance of finding ";
  par += obj + ".";
  
  createP(par);
  
    
  par="";
  
  par+="Just walk.";
  
  createP(par);
  
  
  ////
  
  par="";
  
  par+="";
  
  par+="You will search for ";
  par += obj;
  par+=" with your eyes, not with your mind, allowing the secenery to pass as you scan it for ";
  par += obj + ".";
  
  
  createP(par);
  
  ////
  
  par = "";
  
  par += "If you come to an intersection that you are familiar with, that you know and have seen before, turn left, or right";
  
  createP(par);
  
  
    
//   par = "";
  
//   par += "When you have found ";
//   par += obj;
//   par += " press this button.";
  
  
//   createP(par);
  
  par = "";
  
  timerP = createP("");
  
button = createButton("Press here when you have found " + obj,submitData);
  
button.style("border", "none");
button.style("border-radius", "20px");

button.style("margin", "auto");
button.style("display", "block");

button.style("width", "100%");


button.style("padding", "30px 40px");
  
button.style("font-family", "Georgia");
button.style("font-size", "52px");
    
//button.mouseClicked(this.onClick.bind(this));
    
button.mouseClicked(submitData.bind(button));
}

function setup(){ 
    
  fireBaseInit();
    
  createPars();
  
  

}

function submitData()
{
    finalTime = elapsedTime;
    let data = {object: obj,time:elapsedTime};
    ref.push(data);
    
    clearPars();
    
    fetchData();
}

function fetchData()
{
  var ref = database.ref("objs");
  objData = ref.on("value", gotData);
  console.log(objData);
}

function gotData(data)
{
    var dataVals = data.val();
    var keys = Object.keys(dataVals);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // Look at each fruit object!
      var curObj = (dataVals[key]);
      previousObjs.push(curObj);
    }
    
    console.log(previousObjs);

    displayPrevious();
}

function displayPrevious()
{
    createP("If you feel you have wandered enough, try to ")
    
    let tText = "You found " + obj + " in " + finalTime + " minutes."
    successPar = createP(tText);
    
    successPar.style("font-weight","bold");
    
    
    
    for(let i=0; i<previousObjs.length; i++)
    {
        let thisObj = previousObjs[i];
        
        let prevSentence = "Someone else found " + thisObj.object + " in " + thisObj.time + " minutes."
        
        let tpar = createP(prevSentence);
        //tpar.style("text-align","center");
        prevPs.push(tpar);
    }

}

function clearPars()
{
    let pars = selectAll('p');
    
    //console.log(pars);
    
    for (let i =0; i<pars.length; i++){
        pars[i].remove();
    }
}

function draw(){
  
  megaMin = minute() + (hour() *60) + (day()*60*24);
 
  elapsedTime = megaMin - initMegaMin;
  
  
  //print(elapsedTime);
  
 
  timerP.html("you have been walking for " + elapsedTime
 + " minutes.",false);
  
}

function fireBaseInit() {
  var firebaseConfig = {
    apiKey: "AIzaSyC2z8Z_HgBaz9lYxTDbtxm8dpirYAL4HCg",
    authDomain: "objwalk-2cae7.firebaseapp.com",
    databaseURL: "https://objwalk-2cae7.firebaseio.com",
    projectId: "objwalk-2cae7",
    storageBucket: "objwalk-2cae7.appspot.com",
    messagingSenderId: "729046445473",
    appId: "1:729046445473:web:81c9835f483fd6f2fb6fe0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize Firebase

  console.log(firebase);

  database = firebase.database();
  ref = database.ref('objs');

  var data = {
    name: "jonah",
    score: 100
  }

  //ref.push(data);


  var storage = firebase.storage();


  var storageRef = storage.ref();
}