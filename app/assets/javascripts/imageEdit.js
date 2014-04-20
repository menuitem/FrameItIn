var ImageEdit = (function(){
	// private
	// var image = FrameItIn.canvasToImage(canvas);
	
	var turnSepia = function(canv) {
		
		var image = FrameItIn.canvasToImage(canv);
		var bmp = new createjs.Bitmap(image);
    stage = new createjs.Stage(canv);
		
		//apply a sepia image to the filter
    var sepiaScaleFilter = new createjs.ColorMatrixFilter([
    	0.39, 0.77, 0.19, 0, 0, // red component
      0.35, 0.68, 0.17, 0, 0, // green component
      0.27, 0.53, 0.13, 0, 0, // blue component
      0, 0, 0, 1, 0  // alpha 
    ]); 
      
    bmp.filters = [sepiaScaleFilter];
    bmp.cache(0, 0, image.width*3, image.height*3); // color filters don't change the bounds.
    stage.addChild(bmp);
    stage.update();    
  }
	
	var turnGreyScale = function(canv) {
 		var image = FrameItIn.canvasToImage(canv);
		var bmp = new createjs.Bitmap(image),
			stage = new createjs.Stage(canv);
 			// console.log("image", image);
			// console.log("bmp", bmp);
			// console.log("stage", stage);
		// apply a greyscale filter to the image
		var greyScaleFilter = new createjs.ColorMatrixFilter([
			0.33, 0.33, 0.33, 0, 0, // red
			0.33, 0.33, 0.33, 0, 0, // green
			0.33, 0.33, 0.33, 0, 0, // blue
			0, 0, 0, 1, 0  // alpha
		]);       
		bmp.filters = [greyScaleFilter];
		bmp.cache(0, 0, image.width*3, image.height*3); // color filters don't change the bounds.
		stage.addChild(bmp);
		stage.update();        
	}

	var returnColour = function(canv){
		
    var picture = window.origPicture;
    var ctx = canv.getContext('2d');
    ctx.drawImage(picture, 0, 0);
    
    // var bmp = new createjs.Bitmap(picture);
    // var canv = document.getElementById("dropPic");
    // stage = new createjs.Stage(canv);
    // bmp.cache(0, 0, bmp.width*3, bmp.height*3); // color filters don't change the bounds.
    // stage.addChild(bmp);
    // stage.update();
  }
	
var downloadPic = function(){
        //convert canvas to an img, including a url to the image
        //this url is then used for the download link
    var picarea = document.getElementById('dropPic');
    link.setAttribute("download", "testimage.png");
    link.setAttribute("href", picarea.toDataURL());
  }
	return {
					turnSepia: turnSepia,
					turnGreyScale: turnGreyScale,
					returnColour: returnColour
	}
})()