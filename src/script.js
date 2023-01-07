//uploading a file 

//universal variables so that other functions can use them too

//image:after uploading and displayinging an image we want to put filters on them so that dogrey and dored can also use image
var image;

//we need a copy of uploaded image untouched to be used in reset function
var untouchimage;

//once an image is uploaded and displayed it will turn true and prevent from using filters without image uploaded
var isupload = false;

//upload function takes canid and fid as input
//displayes the file in the appropraite canvas 
function upload(canid, fid){
  
  //capture the HTML canvas element in a java script variable(imgcanvas) to enable manipulation in java script
  var imgcanvas = document.getElementById(canid);
  
  //erases everything on the canvas
  var context = imgcanvas.getContext('2d');
  context.clearRect(0,0,imgcanvas.width,imgcanvas.height);
  context.beginPath();
  
  //capture the HTML file input element in a java script variable to enable manipulation in java script
  var fileinput = document.getElementById(fid);

  //create 2 copies of the uploaded images,one for manipulating and the other for the reset fuction later
  //uploaded image is converted to simple image
  untouchimage = new SimpleImage(fileinput);
  image = new SimpleImage(fileinput);
  
  //image is being displayed in the canvas
  image.drawTo(imgcanvas);
  
  isupload = true;
}


// greyscale function

//dogrey checks is an image is uploaded,makes changes to image and then clears canvas then displays grey image
function dogray(){
  
  //checks is an image is uploaded
  if (isupload == false){
    alert("Please upload an image first");
    return;
  }
  
  //makes changes to image
  var copyimage = image;
  for (var pixel of copyimage.values()){
    var avg = (pixel.getBlue() + pixel.getRed() + pixel.getGreen())/3;
    pixel.setBlue(avg);
    pixel.setRed(avg);
    pixel.setGreen(avg);
  }
  
  //capture the HTML file input element in a java script variable to enable manipulation in java script
  var imgcanvas = document.getElementById("can");
  
  //clears the canvas
  var context = imgcanvas.getContext('2d');
  context.clearRect(0,0,imgcanvas.width,imgcanvas.height);
  context.beginPath();
  
  //displays the grey image in canvas
  copyimage.drawTo(imgcanvas);
}

function dosketch(){
  var copyimage = image;
  for (var pixel of copyimage.values()){
    var avg = (pixel.getBlue() + pixel.getRed() + pixel.getGreen())/3;
    if(avg < 128){
      pixel.setBlue(0);
      pixel.setRed(2*avg);
      pixel.setGreen(0);
    }
    else{
      pixel.setBlue(2*avg);
      pixel.setRed(255);
      pixel.setGreen(2*avg);
    }
  }
  var imgcanvas = document.getElementById("can");
  
   var context = imgcanvas.getContext('2d');
  context.clearRect(0,0,imgcanvas.width,imgcanvas.height);
  context.beginPath();
  
  copyimage.drawTo(imgcanvas);
}


// do red function checks if an image is uploaded,makes changes to image and then clears canvas then displays red image
function dored(){
  
  //checks is an image is uploaded
  if (isupload == false){
    alert("Please upload an image");
    return;
  }
  
//capture the HTML canvas element in a java script variable(imgcanvas) to enable manipulation in java script  
  var copyimage = image;
  for (var pixel of copyimage.values()){
    var avg = (pixel.getBlue() + pixel.getRed() + pixel.getGreen())/3;
    if(avg < 128){
      pixel.setBlue(0);
      pixel.setRed(2*avg);
      pixel.setGreen(0);
 
    }
    else{
      pixel.setBlue((2*avg) - 255);
      pixel.setRed(255);
      pixel.setGreen((2*avg) - 255);
    }

  }
  var imgcanvas = document.getElementById("can");
  
  //clears the canvas
  var context = imgcanvas.getContext('2d');
  context.clearRect(0,0,imgcanvas.width,imgcanvas.height);
  context.beginPath();
  
  //displays the red image in canvas
  copyimage.drawTo(imgcanvas);
}
 
//Greenscreen
//
function greenscreen(){
  var copyimage = image;
  
  //Algorithm for green screen
  for (var pixel of copyimage.values()){
    if(pixel.getGreen()>200){
      var x = pixel.getX();
      var y = pixel.getY();
      var mainpixel = image2.getPixel(x,y); 
      //pixel = mainpixel
      copyimage.setPixel(x,y,mainpixel);
      
    }
  }
  var imgcanvas = document.getElementById("can");
  image.drawTo(imgcanvas);
}


//reset will clear canvas and display the copy of the uploaded untouch image
function reset(canvasid){
  
  var imgcanvas = document.getElementById(canvasid);
  
  //clears the canvas
  var context = imgcanvas.getContext('2d');
  context.clearRect(0,0,imgcanvas.width,imgcanvas.height);
  context.beginPath();
  
  //displays untouchimage
  untouchimage.drawTo(imgcanvas);
  
}  
  

//Algorithum
function doBlur(){
  
  var copyimage = image;
  
  for (var pixel of copyimage.values()){
    
    //variables are set to zero
    var green = 0;
    var blue = 0;
    var red = 0;
    var num = 0;
    
    //geting x and y from pixel and storing value in x and y vaiables
    var x = pixel.getX();
    var y = pixel.getY();
    
    //checks if x+1 is going out of the image
      if ((x+1)<copyimage.getWidth()){
        //num is calculated for the denominator of average calculation or the total number of pixels around the particular pixel
        num = num + 1;
        
        // temp1 is the pixel we are focused on
        // calls getter function on untouchimage to get x+1,y pixel and sets it to temp1
        var temp1 = untouchimage.getPixel(x+1,y);

        //add red,blue and green of temp1 to variable red,blue and green
        red = red + temp1.getRed();
        green = green + temp1.getGreen();
        blue = blue + temp1.getBlue();
      }
   
      if ((x-1) >= 0){
        num = num + 1;

        var temp1 = untouchimage.getPixel(x-1,y);

        red = red + temp1.getRed();
        green = green + temp1.getGreen();
        blue = blue + temp1.getBlue();
      }
    
      if ((y+1) < copyimage.getHeight()){
        num = num + 1;

        var temp1 = untouchimage.getPixel(x,y+1);

        red = red + temp1.getRed();
        green = green + temp1.getGreen();
        blue = blue + temp1.getBlue();
      }
    
      if ((y-1) >= 0){
        num = num + 1;

        var temp1 = untouchimage.getPixel(x,y-1);

        red = red + temp1.getRed();
        green = green + temp1.getGreen();
        blue = blue + temp1.getBlue();
      }
    
      if ((y+1) < copyimage.getHeight() && (x+1)<copyimage.getWidth()){
        num = num + 1;

        var temp1 = untouchimage.getPixel(x+1,y+1);

        red = red + temp1.getRed();
        green = green + temp1.getGreen();
        blue = blue + temp1.getBlue();
      }
    
      if ((y+1) < copyimage.getHeight() && (x-1) >= 0){
        num = num + 1;

        var temp1 = untouchimage.getPixel(x-1,y+1);

        red = red + temp1.getRed();
        green = green + temp1.getGreen();
        blue = blue + temp1.getBlue();
      }
    
      if ((y-1) >= 0 && (x-1) >= 0){
        num = num + 1;

        var temp1 = untouchimage.getPixel(x-1,y-1);

        red = red + temp1.getRed();
        green = green + temp1.getGreen();
        blue = blue + temp1.getBlue();
      }
    
    
      if ((y-1) >= 0 && (x+1)<copyimage.getWidth()){
        num = num + 1;

        var temp1 = untouchimage.getPixel(x+1,y-1);

        red = red + temp1.getRed();
        green = green + temp1.getGreen();
        blue = blue + temp1.getBlue();
      } 
      
      pixel.setRed(Math.round(red/num));
      pixel.setBlue(Math.round(blue/num));
      pixel.setGreen(Math.round(green/num));
  }  
 
  var imgcanvas = document.getElementById("can2");
  
  var context = imgcanvas.getContext('2d');
  context.clearRect(0,0,imgcanvas.width,imgcanvas.height);
  context.beginPath();
  
  copyimage.drawTo(imgcanvas);
}


  
  
  
  
  
  
  
