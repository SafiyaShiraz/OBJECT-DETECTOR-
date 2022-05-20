img= "";
status ="";
objects=[];

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status= true;
    ObjectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }else
    {
        console.log(results);
        objects = results;
    }
}

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function draw()
{
    image(img, 0, 0, 500, 500);
    
    if(status != "");
    {

        for(i= 0; i < objects.length; i++ )
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label +" "+ percent + "%", objects[i].x + 20, objects[i].y + 20);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }    
}