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
    document.getElementById('splash').hidden = true;
    document.getElementById('app').hidden = false;
  }
  function noStream() {
    document.getElementById('errorMessage').textContent = 'No camera available.';
  }
  Media.initMedia(gotStream, noStream);

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
    if(document.getElementsByTagName('input')[0].value == "Shoot"){
      document.getElementsByTagName('input')[0].value="Stop";
      takeInfinitiveShots();
    }else{
      if (t!=null) clearTimeout(t);
      document.getElementsByTagName('input')[0].value="Shoot";
    }

    function handleDragEnd(e) {
      var image = e.target; 
      //using createjs library, which allows filters on the images
      var bmpColour = new createjs.Bitmap(image);
      var bmp = new createjs.Bitmap(image);
      var picarea = document.getElementById('dropPic');
      stage = new createjs.Stage(picarea)
      //draw originally chosen image, in normal colour;
      bmp.cache(0, 0, image.width*2.8, image.height*2.8); // color filters don't change the bounds.
      stage.addChild(bmp);   
      stage.update();

      document.getElementById("returncolour").addEventListener('click', returnColour, false);
      document.getElementById("convertgrey").addEventListener('click', turnGreyScale, false);
      document.getElementById("convertsepia").addEventListener('click', turnSepia, false);
      document.getElementById("link").addEventListener('click', downloadPic, false);


      function turnGreyScale(e) {
        e.preventDefault();
        //apply a greyscale filter to the image
        var greyScaleFilter = new createjs.ColorMatrixFilter([
          0.33, 0.33, 0.33, 0, 0, // red
          0.33, 0.33, 0.33, 0, 0, // green
          0.33, 0.33, 0.33, 0, 0, // blue
          0, 0, 0, 1, 0  // alpha
        ]);       
        bmp.filters = [greyScaleFilter];
        bmp.cache(0, 0, image.width*3, image.height*3); // color filters don't change the bounds.
        stage.update();        
      }

      function turnSepia(e) {
        e.preventDefault();
        //apply a sepia image to the filter
        var greyScaleFilter = new createjs.ColorMatrixFilter([
          0.39, 0.77, 0.19, 0, 0, // red component
          0.35, 0.68, 0.17, 0, 0, // green component
          0.27, 0.53, 0.13, 0, 0, // blue component
          0, 0, 0, 1, 0  // alpha 
        ]);       
        bmp.filters = [greyScaleFilter];
        bmp.cache(0, 0, image.width*3, image.height*3); // color filters don't change the bounds.
        stage.update();        
      }

      function returnColour(e){
        e.preventDefault();
        //return image to original
        bmp = new createjs.Bitmap(image);
        bmp.cache(0, 0, image.width*3, image.height*3); // color filters don't change the bounds.
        stage.addChild(bmp);
        stage.update();
      }

      function downloadPic(e){
        //convert canvas to an img, including a url to the image
        //this url is then used for the download link
        var picarea = document.getElementById('dropPic');
        var url = picarea.toDataURL();
        var newImg = document.createElement("img");
        newImg.src = url;
        var link = document.getElementById('link');
        link.setAttribute("download", "testimage.png");
        link.setAttribute("href", url);
      }

    }// end of dragEnd function

    var pics = document.getElementsByClassName('smallpic');
    var numpics = pics.length;
    for(var i = 0; i < numpics ; i++){
      pics[i].addEventListener('dragend', handleDragEnd, false);   
    }
  } // end of snapshot function

  document.getElementById("shootButton").addEventListener("click", snapShot, false);
    // no worries, buttons yet not workin but it is fine
    // we shoud think about some range scrollbar instead of button 
  document.getElementById("shootXButton").addEventListener("click", function(){alert("we are not working yet..")});
    // document.getElementById("shootInfinitiveButton").addEventListener("click", snapShot)

  //the following uses the screenfull api, and will display a fullscreem, if 
  //supported by the browser
  var elem = document.getElementById('dropArea');
  document.getElementById('fullscreen').addEventListener('click', function () {
    if (screenfull.enabled) {
      screenfull.request(elem);
    }
  });
    
});//end DOMContentLoaded