//these test the following functions in imageEdit.js, by using sinon mocks and spies:
//ImageEdit.turnGreyScale()
//ImageEdit.turnSepia()
//ImageEdit.darken()
//ImageEdit.brighten()
//ImageEdit.drawWhiteBorder()
//ImageEdit.drawBlackBorder()
//ImageEdit.returnColour()
//ImageEdit.displayFullScreen()


describe("testing functions used to modify image in imageEdit.js" , function () {

	var beforeEach = function () {
		//create a valid canvas to be used for test data
		this.testcanv = document.getElementById("testcanvas");
		this.ctx=testcanv.getContext("2d");
  	ctx.rect(0, 0, 10, 10);
  	this.testimage = FrameItIn.canvasToImage(testcanv);

	};

	it("ImageEdit.turnGreyScale: Should call createjs API", function () {

		beforeEach();

		//test the calls to the createjs APIs
		var myMock = sinon.mock(createjs.Container.prototype);
		myMock.expects("addChild").once();
		ImageEdit.turnGreyScale(testcanv);
		expect(myMock.verify()).toBe(true);

		var myMock2 = sinon.mock(createjs.DisplayObject.prototype);
		myMock2.expects("cache").once();
		ImageEdit.turnGreyScale(testcanv);
		expect(myMock2.verify()).toBe(true);
		
	});

	it("ImageEdit.turnSepia: Should call createjs API", function () {

		beforeEach();

		//test the calls to the createjs APIs
		var myMock = sinon.mock(createjs.Container.prototype);
		myMock.expects("addChild").once();
		ImageEdit.turnSepia(testcanv);
		expect(myMock.verify()).toBe(true);

		var myMock2 = sinon.mock(createjs.DisplayObject.prototype);
		myMock2.expects("cache").once();
		ImageEdit.turnSepia(testcanv);
		expect(myMock2.verify()).toBe(true);		
	});


	it ("ImageEdit.darken: Should call createjs API", function () {

		var myMock1 = sinon.mock(createjs.Container.prototype);
		myMock1.expects("addChild").once();
		ImageEdit.darken(testcanv);
		expect(myMock1.verify()).toBe(true);

		var myMock2 = sinon.mock(createjs.DisplayObject.prototype);
		myMock2.expects("cache").once();
		ImageEdit.darken(testcanv);
		expect(myMock2.verify()).toBe(true);
	});


	it ("ImageEdit.brighten: Should call createjs API", function () {

		var myMock1 = sinon.mock(createjs.Container.prototype);
		myMock1.expects("addChild").once();
		ImageEdit.brighten(testcanv);
		expect(myMock1.verify()).toBe(true);

		var myMock2 = sinon.mock(createjs.DisplayObject.prototype);
		myMock2.expects("cache").once();
		ImageEdit.brighten(testcanv);
		expect(myMock2.verify()).toBe(true);

		// var myMock3 = sinon.mock(createjs.ColorMatrix.prototype);	
		// myMock3.expects("adjustBrightness").once().withArgs(30);
		// ImageEdit.brighten(testcanv);
		// alert(myMock3.verify());	
	});


	it ("ImageEdit.drawWhiteBorder: Should use canvas APIs", function () {

		//tests that the rect() and stroke() canvas APIs are called in the drawWhiteBorder function
		var mySpy = sinon.spy();

		CanvasRenderingContext2D.prototype.stroke = mySpy;
		ImageEdit.drawWhiteBorder(testcanv, mySpy);	
  	expect(mySpy.called).toBe(true);

  	CanvasRenderingContext2D.prototype.stroke = mySpy;
		ImageEdit.drawWhiteBorder(testcanv, mySpy);	
  	expect(mySpy.called).toBe(true);	
	});


	it ("ImageEdit.drawBlackBorder: Should use canvas APIs", function () {

		//tests that the rect() and stroke() canvas APIs are called in the drawBlackBorder function
		var mySpy = sinon.spy();

		CanvasRenderingContext2D.prototype.stroke = mySpy;
		ImageEdit.drawBlackBorder(testcanv, mySpy);	
  	expect(mySpy.called).toBe(true);

  	CanvasRenderingContext2D.prototype.stroke = mySpy;
		ImageEdit.drawBlackBorder(testcanv, mySpy);	
  	expect(mySpy.called).toBe(true);	
	});


	it ("ImageEdit.returnColour: Should use canvas APIs", function () {

		//tests that the drawImage() canvas API is called in the returnColour function
		var mySpy = sinon.spy();

		CanvasRenderingContext2D.prototype.drawImage = mySpy;
		ImageEdit.returnColour(testcanv, mySpy);	
  	expect(mySpy.called).toBe(true);	
	});

	it ("ImageEdit.displayFullScreen: Should use screenfull.js API", function () {

		//test that the screenfull.js API has been called
  	var myMock2 = sinon.mock(screenfull);
		myMock2.expects("request").once();
		ImageEdit.displayFullScreen(testcanv);
		expect(myMock2.verify()).toBe(true);
	});

});



