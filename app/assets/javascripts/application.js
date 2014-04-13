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
      this.style.opacity = '1'; 
      var area = document.getElementById('dropArea');
      area.setAttribute('style', 'background:pink');
      var picarea = document.getElementById('dropPic');
      var ctx = picarea.getContext('2d');
      //get the pixels of the image of chosen picture
      var chosenPic = e.target.getContext('2d').getImageData(0, 0, 160, 120);
      
      //create a copy of the image in the larger canvas area
      ctx.putImageData(chosenPic, 10, 10);
             // this / e.target is the source node.
    }

    //add draggable event listeners to the small pictures
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



    //draggable events
    function handleDragStart(e) {
      this.style.opacity = '0.4';  // this / e.target is the source node.
 
      //e.dataTransfer.effectAllowed = 'copy';
      //e.dataTransfer.setData('text/html', this);

      var area = document.getElementById('dropArea');
      area.setAttribute('style', 'background:grey');
    }

    function handleDragEnter(e) {
      e.preventDefault();

      var area = document.getElementById('dropArea');
      area.setAttribute('style', 'background:blue');
      return true;
    }

    function handleDragLeave(e) {
        var area = document.getElementById('dropArea');
 
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }  
      return false;
    }

    function handleDrop(e) {
       e.stopPropagation();
       return false;

    }

    

    var pics = document.getElementsByClassName('smallpic');
    var numpics = pics.length;
    for(var i = 0; i < numpics ; i++){
      pics[i].addEventListener('dragstart', handleDragStart, false);
      pics[i].addEventListener('dragover', handleDragOver, false);
      pics[i].addEventListener('dragleave', handleDragLeave, false);
    }
    
    var area = document.getElementById('dropArea');
    area.addEventListener('dragenter', handleDragEnter, false);
    area.addEventListener('drop', handleDrop, false);
    area.addEventListener('dragover', handleDragOver, false);
    
});//end DOMContentLoaded