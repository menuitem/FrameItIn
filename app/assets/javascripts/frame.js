  var Media = (function(){
    //will need to move here all getUserMediaAPI
      navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia || navigator.msGetUserMedia);

    return{
      initMedia: function(gotStream, noStream){
                  navigator.getMedia({
                    video: true
                  // ,audio: true //want some audio??
                  }, gotStream, noStream);
      }
    }
  })();

  var FrameItIn = (function(){
    //downloading pictures
      var download = function(e){
        var eTarget = e.target || e.srcElement
            ,image = eTarget.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href=image; 
      }
      
    return{
      takeShot: function(video){
          if (video.readyState) {
              try {
                  //create new canvas element 
                  var snap = document.createElement("canvas");
                  //change size of snapshot
                  canvasW = video.videoWidth /1.7  ;
                  canvasH = video.videoHeight /1.7;
                  snap.setAttribute('width',canvasW);
                  snap.setAttribute('height',canvasH);
                  snap.getContext('2d').drawImage(video,0,0,canvasW,canvasH);
                  snap.setAttribute('draggable', 'true');
                  //convert canvas snaphot to an img
                  var url = snap.toDataURL();
                  var smallImg = document.createElement("img");
                  smallImg.src = url;
                  smallImg.setAttribute("width", "160px");
                  smallImg.setAttribute("height", "120px");
                  smallImg.classList.add("smallpic");
                  document.getElementById("snapshots").appendChild(smallImg);

                  return snap;
                } catch (e) {
                    document.getElementById('splash').hidden = false;
                    errorMessage.textContent = "Splash! Something went wrong..." + e;
                }
          }
        }
      }
  })()