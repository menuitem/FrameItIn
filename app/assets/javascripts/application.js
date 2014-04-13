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
//= require twitter/bootstrap
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
      //convert the selected small image to a larger canvas element
      //and display it in the larger section at the top of the page
      var area = document.getElementById('dropArea');
      area.setAttribute('style', 'background:pink');
      var picarea = document.getElementById('dropPic');
      var ctx = picarea.getContext('2d');
      ctx.drawImage(e.target, 10,10);
      var url = picarea.toDataURL();
      var newImg = document.createElement("img");
      newImg.src = url;

      //create a download link to save picture to file on computer
      var link = document.getElementById('link');
      link.setAttribute("download", "testimage.png");
      link.setAttribute("href", url);
    }

    var pics = document.getElementsByClassName('smallpic');
    var numpics = pics.length;
    for(var i = 0; i < numpics ; i++){
      pics[i].addEventListener('dragend', handleDragEnd, false);   
    }
  }
    document.getElementById("shootButton").addEventListener("click", snapShot, false);
    // no worries, buttons yet not workin but it is fine
    // we shoud think about some range scrollbar instead of button 
    document.getElementById("shootXButton").addEventListener("click", function(){alert("we are not working yet..")});
    // document.getElementById("shootInfinitiveButton").addEventListener("click", snapShot)

    
});//end DOMContentLoaded