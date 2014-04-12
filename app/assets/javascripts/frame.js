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
                  canvasW = video.videoWidth /4 ;
                  canvasH = video.videoHeight /4;
                  snap.setAttribute('width',canvasW);
                  snap.setAttribute('height',canvasH);
                  snap.getContext('2d').drawImage(video,0,0,canvasW,canvasH);
                  snap.setAttribute('draggable', 'true');
                  snap.classList.add("smallpic");
                  snap.addEventListener("dblclick",download); //double click to download picture
                  document.getElementById("snapshots").appendChild(snap);
                  return snap;
                } catch (e) {
                    document.getElementById('splash').hidden = false;
                    errorMessage.textContent = "Splash! Something went wrong..." + e;
                }
          }
        }
      }
  })()