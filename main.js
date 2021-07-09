img = "";
status = "";
objects = [];

function setup() {
	canvas = createCanvas(390, 390);
	canvas.center();
	video = createCapture(VIDEO);
	video.hide();
	objectDetector = ml5.objectDetector('cocossed', modelLoaded)
	document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload() {
	img = loadImage('dog_cat.jpg');

}

function draw() {
	image(video, 0, 0, 390, 390);
	
	if (status != "") {
		for (i = 0; i < objects.length; i++) {
			document.getElementById("status").innerHTML = "status : Objects Detected";
			r = random(255);
			g = random(255);
			b = random(255);
			objectDetector.detect(video,gotResult);
			document.getElementById("status").innerHTML = "number of objects detected are : objects.length";
			fill(r,g,b);
			percent = floor(objects[i].confidence * 100);
			text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
			noFill();
			rect(objects[i].x - 15, objects[i].y, objects[i].width,objects[i].height);
			stroke(r,g,b);
		}
	}
}

function modelLoaded() {
	console.log("Model Loaded !")
	status = true;
	objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
	if (error) {
		console.log(error)
	}
	console.log(results);
	objects = results;
}
