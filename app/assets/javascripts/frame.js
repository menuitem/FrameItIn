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
      var showFileNameDiv = function(domEl, action, imgSrc){
        domEl.hidden=false;
        if ($){ // if jQuery
          var actionLink = $(domEl).find("a:first");
          $(actionLink).text(action);
          $(domEl).hide().slideDown(300);
          $(actionLink).on("click", function(e){
            if ($(actionLink).text()== "Upload"){
              e.preventDefault();
              var fileName = getFileName(domEl);
              if (fileName.length != ""){
                $(actionLink).text("Uploading")
                uploadToCloud(imgSrc, fileName);
              }else{
              // display message, validate etc.
              alert(" file name cant be blank !"); //temp alert
              }
            }
            if ($(actionLink).text()== "Download"){
              var link = $(domEl).find("a:first");
              var fileName=$(domEl).find("input").val()
                if(fileName.length>3){
                  $(link).attr("download", fileName );
                  $(link).attr("href", imgSrc.src);
                  $(domEl).slideUp(100);
                }
              }
          })
          var cancelLink = $(domEl).find("a:last");
          $(cancelLink).on("click", function(e){
            e.preventDefault();
            $(domEl).find("input").val("");
            $(domEl).slideUp(300);
          }); 
        }
      }
      var uploadToCloud = function(imgSrc, fileName){
        if ($){ // if jQuery
          $("body").css("cursor", "progress");
          var data = {
                      "picture[name]":fileName,
                      "picture[image_data]":imgSrc,
                      "picture[public]":"false"}
          $.post("/pictures", data ,function(res){
            $("#fileNameDiv").slideUp(100);
            $("body").css("cursor", "default");
          })
            .fail(function(err){
              console.log(err)
              return err;
            })
        }else{
          alert("Need jQuery do this")
        }
      }
      var getFileName = function(domEl){
        return $(domEl).find("input").val() 
      }
      var hideFileNameDiv = function(domEl){
        if ($){ // if jQuery
          $(divId).hide().slideUp(300);
          return
        }
        divId.hidden=true;
      }

      //Capturing picture from camera to canvas 
      var getCanvasFromCamera = function(vid){
        var video = vid,
            canvas = document.createElement("canvas"),
            //change size of snapshot
            canvasW = video.videoWidth /1.7,
            canvasH = video.videoHeight /1.7;
        
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
          linkMenuDiv.hidden = true;
        var selectButton = document.createElement("button");
          selectButton.classList.add("glyphicon-wrench");
          selectButton.setAttribute("title", "Select")
          linkMenuDiv.appendChild(selectButton);
        var downloadButton = document.createElement("button");
          downloadButton.classList.add("glyphicon-download-alt");
          downloadButton.setAttribute("title", "Download")
          linkMenuDiv.appendChild(downloadButton)
        var uploadButton = document.createElement("button");
          uploadButton.classList.add("glyphicon-cloud");
          uploadButton.setAttribute("title", "Upload")
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
          var imgData = e.target.parentNode.parentNode.firstChild.src;
          // var dataURL = img.replace('data:image/png;base64,','')
          this.disabled=true;
           showFileNameDiv(document.getElementById("fileNameDiv"), "Upload", imgData);
        });
        //listener for small download button 
        downloadButton.addEventListener("click", function(e){
          var imgData = e.target.parentNode.parentNode.firstChild;
          // var dataURL = img.replace('data:image/png;base64,','')
           showFileNameDiv(document.getElementById("fileNameDiv"), "Download", imgData);
        });
        return linkMenuDiv;
      }

    return{
      showFileNameDiv: showFileNameDiv,
      canvasToImage: canvasToImage,
      takeShot: function(video){
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
                  //Listeners to small images (show hide menu oon mouse in and out)
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
                  
                  // return canvas;
                } catch (e) {
                    document.getElementById('splash').hidden = false;
                    errorMessage.textContent = "Splash! Something went wrong..." + e;
                }
          }
        }
      }
  })();
