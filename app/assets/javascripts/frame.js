  var FrameItIn = (function(){
    //will need to move here all getUserMediaAPI
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
                  // snap.addEventListener("dblclick",download); //double click to download picture
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