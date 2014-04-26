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
//= require bootstrap/dist/js/bootstrap
//= require EaselJS/lib/easeljs-0.7.1.min
//= require screenfull/dist/screenfull
//= require jquery_ujs
//= require_tree .

document.addEventListener("DOMContentLoaded", function(event) { //so we dnt have to move loading js to the bottom of page
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
  var takeOneShot = function(){
      FrameItIn.takeShot(video);
  }
  var takeXShot = function(x){
    for (i=0; i<x;i++){
      FrameItIn.takeShot(video);
    }
  }
    
  var snapShot = function(m) {
    if(document.getElementById("shootButton").value == "Shoot"){
      document.getElementById("shootButton").value="Stop";
      takeInfinitiveShots();
      document.getElementById("cameraButton").classList.add("deeppink")
    }else{
      if (t!=null) clearTimeout(t);
      document.getElementById("shootButton").value="Shoot";
      document.getElementById("cameraButton").classList.remove("deeppink")

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
  // end of snapshot function
  

//the following uses the screenfull api, and will display a fullscreen, if 
//supported by the browser
var elem = document.getElementById('dropPic');
if (elem){
//listners to edit pictures area
//listener to download
  document.getElementById("link").addEventListener('click', function(e){
    var canvas = FrameItIn.canvasToImage(document.getElementById("dropPic"));
    var fileName = FrameItIn.getFileNameDiv("Save", canvas);
    $("#fileNameDiv").html(fileName).hide().slideDown();

  }, false);
  document.getElementById("upload").addEventListener('click', function(e){
    var canvas = FrameItIn.canvasToImage(document.getElementById("dropPic"));
    var fileName = FrameItIn.getFileNameDiv("Upload", canvas);
    $("#fileNameDiv").html(fileName).hide().slideDown();

  }, false);
  //return to colour
  document.getElementById("returncolour").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.returnColour(canv);
  }, false);
  
  //listener to greyscale
  document.getElementById("convertgrey").addEventListener('click', function(e){
    e.preventDefault();
    var canv = document.getElementById("dropPic");
    ImageEdit.turnGreyScale(canv);
  }, false);
  
  //listener to Sepia
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

  document.getElementById('fullscreen').addEventListener('click', function () {
    if (screenfull.enabled) {
      screenfull.request(elem);
    }
  });
  }

});//end DOMContentLoaded