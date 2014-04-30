// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap/dist/js/bootstrap
//= require slimScroll/jquery.slimscroll
//= require angular/angular
//= require angular-route/angular-route
//= require angular-animate/angular-animate
//= require screenfull/dist/screenfull
//= require EaselJS/lib/easeljs-0.7.1.min
//= require_tree .

document.addEventListener("DOMContentLoaded", function(event) { //so we dnt have to move loading js to the bottom of page
  ChangeTheme.changeTheme();
  var video = document.getElementById('monitor');
  function gotStream(stream) {
    if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
    } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);

    }
    document.getElementById("cameraButton").classList.remove("notvisible")
    document.getElementById('splash').hidden = true;
    document.getElementById('app').hidden = false;
  }
  function noStream() {
    document.getElementById('errorMessage').textContent = 'No camera available.';
  }
  video?Media.initMedia(gotStream, noStream):{};

  var t;
  var takeInfinitiveShots = function(){
    t=setTimeout(function(){
      FrameItIn.takeShot(video);
      takeInfinitiveShots();
    },1000);
  }

  //future development:
  // var takeOneShot = function(){
  //     FrameItIn.takeShot(video);
  // }
  // var takeXShot = function(x){
  //   for (i=0; i<x;i++){
  //     FrameItIn.takeShot(video);
  //   }
  // }
    
  var snapShot = function(m) {
    if(document.getElementById("shootButton").value == "Shoot"){
      document.getElementById("shootButton").value="Stop";
      takeInfinitiveShots();
      document.getElementById("cameraButton").classList.add("deeppink")
    }else{
      if (t!=null) clearTimeout(t);
      document.getElementById("shootButton").value="Shoot";
      document.getElementById("cameraButton").classList.remove("deeppink");
    }
  } 

  document.getElementById("shootButton")?
  document.getElementById("shootButton").
  addEventListener("click", snapShot, false):{};

  document.getElementById("shootButton")?
  document.getElementById("cameraButton").
  addEventListener("click", function(e){
    e.preventDefault();
    snapShot();
  }, false):{};

  

var elem = document.getElementById('dropPic');
if (elem){
  //listeners to edit pictures area:
  //listener to save picture to file
  document.getElementById("link").addEventListener('click', function(e){
    var canvas = FrameItIn.canvasToImage(document.getElementById("dropPic"));
    var fileName = FrameItIn.getFileNameDiv("Save", canvas);
    $("#fileNameDiv").html(fileName).hide().slideDown();
  }, false);

  //listener to upload the picture to the server and database
  document.getElementById("upload").addEventListener('click', function(e){
    var canvas = FrameItIn.canvasToImage(document.getElementById("dropPic"));
    var fileName = FrameItIn.getFileNameDiv("Upload", canvas);
    $("#fileNameDiv").html(fileName).hide().slideDown();
  }, false);

  //listener to return to colour
  document.getElementById("returncolour").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.returnColour(canv);
  }, false);
  
  //listener to turn picture to greyscale
  document.getElementById("convertgrey").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.turnGreyScale(canv);
  }, false);
  
  //listener to turn picture to Sepia
  document.getElementById("convertsepia").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.turnSepia(canv);
  }, false);

  //listener to Brighten
  document.getElementById("brighten").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.brighten(canv);
  }, false);

  //listener to Darken
  document.getElementById("darken").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.darken(canv);
  }, false);

  //listener to Draw Black Border
  document.getElementById("drawblackborder").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.drawBlackBorder(canv);
  }, false);

  //listener to Draw White Border
  document.getElementById("drawwhiteborder").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.drawWhiteBorder(canv);
  }, false);

  //the following uses the screenfull api, and will display a fullscreen, if 
  //supported by the browser
  document.getElementById('fullscreen').addEventListener('click', function (e) {
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.displayFullScreen(canv);
  }, false);
  
}

});//end DOMContentLoaded