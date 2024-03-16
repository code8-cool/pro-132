prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = " The prediction is " + prediction;
        var  utterThis = new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rate = 0.65
    synth.speak(utterThis);
    }

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

//create your model and store it in var classifier 
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KRVlCBGS6/model.json',modelLoaded);
//define function modelLoaded
function modelLoaded()
{
    console.log('Model Loaded!')
}
//define function check() 

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);

}

//define function gotResult(error, results)

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
 console.log(results);
 document.getElementById("status").innerHTML = results[0].label;
  prediction = results[0].label;



speak();


if(results[0].label == "no mask")
{
    document.getElementById("status").innerHTML = "&#128522;";  
}

if(results[0].label == "good mask")
{
    document.getElementById("status").innerHTML = "&#128546;";  
}

if(results[0].label == "wrong mask")
{
    document.getElementById("status").innerHTML = "&#128548;";  
}





}

}
