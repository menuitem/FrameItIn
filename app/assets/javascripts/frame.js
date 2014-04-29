
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

      var getAlertDiv = function(message){
        var alerter = document.createElement("div");
        alerter.classList.add("alert");
        alerter.classList.add("alert-danger");
        alerter.classList.add("alert-dismissable");
        var button = document.createElement("button");
            button.classList.add("close");
            button.setAttribute("data-dismiss","alert");
            button.setAttribute("aria-hidden", "true");
            $(button).html("&times;");
        alerter.appendChild(button);
        var strEl = document.createElement("strong");
            strEl.textContent="Alert: " + message;
            alerter.appendChild(strEl)
            // alerter.textContent=message 
        return alerter;
      }

      var getFileNameDiv = function(action, imgSrc){
        var fileNameDiv = document.createElement('div');
          fileNameDiv.setAttribute("id", "fixed-top");
        var inputGroup = document.createElement("div");
          inputGroup.classList.add("input-group");
          fileNameDiv.appendChild(inputGroup);
        var inputNameEl = document.createElement("input");
          inputNameEl.setAttribute("type", "typext");
          inputNameEl.setAttribute("placeholder", "File name, please...");
          inputNameEl.classList.add("form-control");
          inputGroup.appendChild(inputNameEl);
        var actionLink = document.createElement("a");
          actionLink.classList.add("input-group-addon");
          actionLink.textContent = action;
          actionLink.href='#';
        var cancelLink = document.createElement("a");
          cancelLink.classList.add("input-group-addon");
          cancelLink.href='#';
          cancelLink.textContent = "Cancel";
        inputGroup.appendChild(actionLink);
        inputGroup.appendChild(cancelLink);
        var errorDiv = document.createElement("div");
        fileNameDiv.appendChild(errorDiv);
        $(actionLink).on("click", function(e){
          var fileName = inputNameEl.value.trim();
          if ($(actionLink).text()== "Upload"){
            e.preventDefault();
            try{
              var imgData = imgSrc.src||imgSrc.parentNode.parentNode.firstChild.src;
              Validate.currentUser();
              Validate.fileName(fileName);
              $(actionLink).text("Uploading");
              $(actionLink).attr("href","");
              if(uploadToCloud(imgData, fileName)){
                imgSrc.disabled=true;
              };
            }catch(err){
              var alertdiv = getAlertDiv(err.message);
              $(errorDiv).html(alertdiv);
            }
          }
          if ($(actionLink).text()== "Save"){
            try{
              Validate.fileName(fileName);
              $(actionLink).attr("download", fileName );
              $(actionLink).attr("href", imgSrc.src);
              $("#fileNameDiv").slideUp(100);
            }catch(err){
             var alertdiv = getAlertDiv(err.message);
              $(errorDiv).html(alertdiv); 
            }
          }
        })
        $(cancelLink).on("click", function(e){
          e.preventDefault();
          $("#fileNameDiv").slideUp(100);
        }); 
        return fileNameDiv;
      }

      var uploadToCloud = function(imgSrc, fileName){
          $("body").css("cursor", "progress");
            var data = {
                        "picture[name]":fileName,
                        "picture[image_data]":imgSrc,
                        "picture[public]":"false"}
            $.post("/pictures", data ,function(res){
              $("#fileNameDiv").slideUp(100);
              $("body").css("cursor", "default");
              $("#fileNameDiv").slideUp(100);
              imgSrc.disabled=true;
              return true;
            })
              .fail(function(err){
                var dipslayError = getAlertDiv(err.responseText);
                $("#fileNameDiv").append(dipslayError);
                $("body").css("cursor", "default");
                return false;
            })
      }

      //Capturing picture from camera to canvas 
      var getCanvasFromCamera = function(vid){
        var video = vid,
            canvas = document.createElement("canvas"),
            //change size of snapshot
            canvasW = video.videoWidth /1.6,
            canvasH = video.videoHeight /1.6;
        
        canvas.setAttribute('width',canvasW);
        canvas.setAttribute('height',canvasH);
        canvas.getContext('2d').drawImage(video,0,0,canvasW,canvasH);
        // canvas.setAttribute('draggable', 'true');
        return canvas
      }

      //convert canvas snaphot to an img
      var canvasToImage = function(canvas){
        var url = canvas.toDataURL();
        var smallImg = document.createElement("img");
        smallImg.src = url;
        return smallImg;
      }

      //creating menu with select, download and upload buttons. parameter button size in px 
      var getLinks = function(buttonSize){
        var buttonSize = buttonSize || 32;
        var linkMenuDiv = document.createElement("div");
          // linkMenuDiv.classList.add("center-block");
          linkMenuDiv.hidden = true;
        var selectButton = document.createElement("a");
          selectButton.classList.add("glyphicon-wrench");
          selectButton.setAttribute("title", "Select for edit.")
          selectButton.setAttribute("href","#editarea")
          linkMenuDiv.appendChild(selectButton);
        var downloadButton = document.createElement("a");
          downloadButton.classList.add("glyphicon-download-alt");
          downloadButton.setAttribute("title", "Save to the drive.")
          linkMenuDiv.appendChild(downloadButton)
        var uploadButton = document.createElement("a");
          uploadButton.classList.add("glyphicon-cloud");
          uploadButton.setAttribute("title", "Upload to cloud.")
          linkMenuDiv.appendChild(uploadButton)
        var el = linkMenuDiv.firstChild;
        while(el){
          el.classList.add("glyphicon");
          el.classList.add("btn");
          el.classList.add("btn-primary");
          el.setAttribute("data-toggle","tooltip");
          el.setAttribute("data-placement","bottom");
          el.setAttribute("style", "font-size:"+buttonSize+"px;margin: 3px;");
          el = el.nextSibling;
        }
        //listener for small select button 
        selectButton.addEventListener("click", function(e,container){
          var img = e.target.parentNode.parentNode.firstChild;
          window.origPicture = img;
          var canvas = document.getElementById("dropPic");
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0)
        });
        //listener for small upload button 
        uploadButton.addEventListener("click", function(e){
           var fileName = getFileNameDiv("Upload", e.target);
           $("#fileNameDiv").html(fileName).hide().slideDown();
        });
        //listener for small download button 
        downloadButton.addEventListener("click", function(e){
          var imgData = e.target.parentNode.parentNode.firstChild;
          var fileName = getFileNameDiv("Save", imgData);
          $("#fileNameDiv").html(fileName).hide().slideDown();
        });
        return linkMenuDiv;
      }

      var takeShot = function(video){
          if (video.readyState) {
              try {
                  var canvas = getCanvasFromCamera(video);
                  var image = canvasToImage(canvas)  
                  var smallDivImage = document.createElement("div");
                  smallDivImage.setAttribute("style","width:160px");
                  smallDivImage.setAttribute("style","height:120px");
                  smallDivImage.setAttribute("style", "display:inline-block;position:relative;");
                  image.classList.add("smallpic");
                  var links = getLinks(12); //button size in px
                  smallDivImage.appendChild(image);
                  $(smallDivImage).append(links);
                  document.getElementById("snapshots").appendChild(smallDivImage);
                  //Listeners to small images (show hide menu on mouse in and out)
                  smallDivImage.addEventListener("mouseenter",function(e) {
                      var menu = e.target.firstChild.nextSibling;
                      menu.setAttribute("style","position:absolute;left:0px;top:0px;");
                      e.target.firstChild.opacity = 0.4;
                      menu.hidden=false;
                      if ($) { // if jQuery
                        $(menu).hide().slideDown(500);
                      }
                  });
                  smallDivImage.addEventListener("mouseleave",function(e) {
                      var menu = e.target.firstChild.nextSibling                  
                      if ($) { // if jQuery
                        $(menu).slideUp(100);
                      }
                      menu.hidden=true;
                  });
              // catch error if video is not running properly
              } catch (e) {
                  document.getElementById('splash').hidden = false;
                  errorMessage.textContent = "Splash! Something went wrong..." + e;
              }
          }
      }

    return{
      getFileNameDiv: getFileNameDiv,
      getAlertDiv: getAlertDiv,
      getFileNameDiv: getFileNameDiv,
      canvasToImage: canvasToImage,
      getCanvasFromCamera: getCanvasFromCamera,
      getLinks: getLinks,
      takeShot: takeShot  
    }

  })();
