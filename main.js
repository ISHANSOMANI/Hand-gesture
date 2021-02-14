prediction_1="";
prediction_2="";

Webcam.set({
width:350,
height:300,
image_format:'jpeg',
jpeg_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>"
    });
}

console.log("ml5_version",ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XslysHImp/model.json",modelLoaded);

function modelLoaded(){
    console.log("model loaded successfully");
}

function Speech(){
    var synth = window.speechSynthesis;
speak_data_1 = "I think it is"+prediction_1;
speak_data_2 = "I also think it is"+prediction_2;
utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult); 
}
function gotResult(error,results){
if (error){
    console.log(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    Speech();
    if (results[0].label =="Victory"){
        document.getElementById("update_emoji").innerHTML = ">&#9996;";
    }
    if (results[0].label =="Amazing"){
        document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if (results[0].label =="Good"){
        document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    
    
    if (results[1].label =="Victory"){
        document.getElementById("update_emoji2").innerHTML = "&#128512;";
    }
    if (results[1].label =="Amazing"){
        document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }
    if (results[1].label =="Good"){
        document.getElementById("update_emoji2").innerHTML = "&#x1f632;";
    }
    
}
}
