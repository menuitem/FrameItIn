var ImageEdit = (function(){
	
	var turnSepia = function(canv) {
		//applies and Easeljs colour filter to turn image to greyscale
		var image = FrameItIn.canvasToImage(canv);
		var bmp = new createjs.Bitmap(image);
    stage = new createjs.Stage(canv);
		
		//add a sepia filter
    var sepiaScaleFilter = new createjs.ColorMatrixFilter([
    	0.39, 0.77, 0.19, 0, 0, // red component
      0.35, 0.68, 0.17, 0, 0, // green component
      0.27, 0.53, 0.13, 0, 0, // blue component
      0, 0, 0, 1, 0  // alpha 
    ]); 
      
    bmp.filters = [sepiaScaleFilter];
    bmp.cache(0, 0, image.width*3, image.height*3); 
    stage.addChild(bmp);
    stage.update();    
  }
	
	var turnGreyScale = function(canv) {
		//applies and Easeljs colour filter to turn image to greyscale
 		var image = FrameItIn.canvasToImage(canv);
		var bmp = new createjs.Bitmap(image),
			stage = new createjs.Stage(canv);
		var greyScaleFilter = new createjs.ColorMatrixFilter([
			0.33, 0.33, 0.33, 0, 0, // red
			0.33, 0.33, 0.33, 0, 0, // green
			0.33, 0.33, 0.33, 0, 0, // blue
			0, 0, 0, 1, 0  // alpha
		]);       
		bmp.filters = [greyScaleFilter];

		bmp.cache(0, 0, image.width*3, image.height*3); 
		stage.addChild(bmp);
		stage.update();        
	}

	var returnColour = function(canv){
		//returns the picture to original state if it has been edited
    var picture = window.origPicture;
    var ctx = canv.getContext('2d');
    ctx.drawImage(picture, 0, 0);
  }

  var brighten = function(canv) {
  	//apply an Easeljs color filter to brighten the image
 		var image = FrameItIn.canvasToImage(canv);
		var bmp = new createjs.Bitmap(image),
			stage = new createjs.Stage(canv);

		 var matrix = new createjs.ColorMatrix().adjustBrightness(30);
		 bmp.filters = [
		     new createjs.ColorMatrixFilter(matrix)
		 ];

		 bmp.cache(0, 0, image.width*3, image.height*3); 
		 stage.addChild(bmp);
		 stage.update();  
	}

	var darken = function(canv) {
		//apply an Easeljs color filter to darken the image
 		var image = FrameItIn.canvasToImage(canv);
		var bmp = new createjs.Bitmap(image),
			stage = new createjs.Stage(canv);

		 var matrix = new createjs.ColorMatrix().adjustBrightness(-30);
		 bmp.filters = [
		     new createjs.ColorMatrixFilter(matrix)
		 ];

		 bmp.cache(0, 0, image.width*3, image.height*3); 
		 stage.addChild(bmp);
		 stage.update();  
	}

  var drawBlackBorder = function(canv){
  	//draws a clear rectangle with a white border on the canvas element
  	var ctx=canv.getContext("2d");
  	ctx.rect(0, 0, 400, 300);
  	ctx.lineWidth = 40;
  	ctx.strokeStyle = 'black';
		ctx.stroke();

  }

  var drawWhiteBorder = function(canv){
  	//draws a clear rectangle with a white border on the canvas element
  	var ctx=canv.getContext("2d");
  	ctx.rect(0, 0, 400, 300);
  	ctx.lineWidth = 40;
  	ctx.strokeStyle = 'white';
		ctx.stroke();
  }

  var displayFullScreen = function(canv){
  	//displays the canvas element in fullscreen mode
  	//using the screenfull.js API
  	if (screenfull.enabled) {
       screenfull.request(canv);
    }
    else {
    	//alert user fullscreen mode is not enabled
    }
  }
	
	return {
					turnSepia: turnSepia,
					turnGreyScale: turnGreyScale,
					returnColour: returnColour,
					drawBlackBorder: drawBlackBorder,
					drawWhiteBorder: drawWhiteBorder,
					brighten: brighten,
					darken: darken,
					displayFullScreen: displayFullScreen
	}

})();