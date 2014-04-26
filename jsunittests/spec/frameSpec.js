
describe("testing functions used to modify image" , function () {

	var beforeEach = function () {
		//need a valid canvas to pass to the method
		this.testcanv = document.getElementById("testcanvas");
		this.ctx=testcanv.getContext("2d");
  	ctx.rect(0, 0, 10, 10);
	};

	it("ImageEdit.turnGreyScale: Should call createjs API", function () {

		beforeEach();

		//test the calls to the createjs APIs within the ImageEdit.turnGreyScale
		var myAPI1 = (new createjs.Stage());
		var myAPI2 = (new createjs.Bitmap());

		var myMock = sinon.mock(myAPI1);
		ImageEdit.turnGreyScale(testcanv, myMock);
		expect(myMock.verify()).toBe(true);

		myMock = sinon.mock(myAPI2);
		ImageEdit.turnGreyScale(testcanv, myMock);
		expect(myMock.verify()).toBe(true);
		
	});

	it("ImageEdit.turnSepia: Should call createjs API", function () {

		beforeEach();

		// //test the calls to the createjs APIs within the ImageEdit.turnGreyScale
		// var myAPI1 = createjs;
		// var myAPI2 = new createjs.Bitmap();
		// var myStub = sinon.stub(new createjs.Stage, "addChild");
		// var myStub2 = sinon.spy();

		

		// //sinon.spy(myAPI1, testcanv).andCallThrough();
		// var myMock1 = sinon.mock(myAPI1);
		// var myMock2 = sinon.mock(myAPI2);

		// //myMock1.expects("method").Stage();
		// ImageEdit.turnSepia(testcanvas, myStub);
		// //ImageEdit.turnSepia(testcanv, myMock2);
		// alert(myStub.called);
		// //expect(myMock1).toHaveBeenCalled();
		// //expect(myMock2).toHaveBeenCalled();
		
	});

	it ("ImageEdit.brighten: Should call createjs API", function () {

		// var myAPI1 = new createjs.Stage();
		// var myAPI2 = new createjs.Bitmap();
		// var myAPI3 = new createjs.ColorMatrix().adjustBrightness(30);
	  
		// var myMock = sinon.mock(myAPI1);
		// ImageEdit.turnGreyScale(testcanv, myMock);
		// expect(myMock.verify()).toBe(true);

		// myMock = sinon.mock(myAPI2);
		// ImageEdit.turnGreyScale(testcanv, myMock);
		// expect(myMock.verify()).toBe(true);

	});
});

describe("testing functions that use html canvases" , function () {
	it("FrameItIn.canvasToImage: Should convert a canvas to an image", function () {
		var testimage = FrameItIn.canvasToImage(testcanv);
  	expect(testimage).not.toBeNull();
  	expect(testimage.tagName.toLowerCase()).toBe("img");
	});
    
  it("FrameItIn.getCanvasFromCamera: Should create a canvas from a picture", function () {
		var testimage = FrameItIn.canvasToImage(testcanv);
  	var result = FrameItIn.getCanvasFromCamera(testimage);
  	expect(result).not.toBeNull();
  	expect(result.tagName.toLowerCase()).toBe("canvas");
	});
});

describe("testing functions that create new dom elements" , function () {
	it("FrameItIn.getAlertDiv: Should create a new div, with 2 children", function () {
		//function should create and return a new div
		var testdiv = FrameItIn.getAlertDiv("test message");
		expect(testdiv).not.toBeNull();
  	expect(testdiv.tagName.toLowerCase()).toBe("div");
  	var children = testdiv.childNodes;
  	expect(children.length).toBe(2);
  	expect(children[0].tagName.toLowerCase()).toBe("button");
  	expect(children[1].tagName.toLowerCase()).toBe("strong");
	});

	it("FrameItIn.getLinks: Should create a div with 3 buttons for select, save and upload", function () {
		//function should create and return a new div
		var testdiv = FrameItIn.getLinks(32);
  	expect(testdiv).not.toBeNull();
  	expect(testdiv.tagName.toLowerCase()).toBe("div");
  	var children = testdiv.childNodes;
  	expect(children.length).toBe(3);
  	expect(children[0].tagName.toLowerCase()).toBe("button");
  	expect(children[0].getAttribute("title")).toBe("Select for edit.");
  	expect(children[1].tagName.toLowerCase()).toBe("button");
  	expect(children[1].getAttribute("title")).toBe("Save to the drive.");
  	expect(children[2].tagName.toLowerCase()).toBe("button");
  	expect(children[2].getAttribute("title")).toBe("Upload to cloud.");
	});

	it("FrameItIn.getFileNameDiv: Should create a div, with children that have event listeners", function () {
		//function should return a new div
		var testdiv = FrameItIn.getFileNameDiv("testaction", "testimgsrc");
  	expect(testdiv).not.toBeNull();
  	expect(testdiv.tagName.toLowerCase()).toBe("div");

  	//div should have 2 child divs
  	var children = testdiv.childNodes;
  	expect(children.length).toBe(2);
  	expect(children[0].tagName.toLowerCase()).toBe("div");
  	expect(children[1].tagName.toLowerCase()).toBe("div");

  	//first child element has more child elements added to it
  	var testgroup = children[0];
  	expect(testgroup.childNodes.length).toBe(3);

  	//test the next layer of child nodes
  	children = testgroup.childNodes;
  	expect(children[0].tagName.toLowerCase()).toBe("input");
  	expect(children[1].tagName.toLowerCase()).toBe("a");
  	expect(children[2].tagName.toLowerCase()).toBe("a");

  	//ensure the 1st child node has no event listeners,
  	//and that last 2 child nodes have click event listeners
  	var events = $._data(children[0], "events");
  	expect(typeof(events)).toBe('undefined');
  	events = $._data(children[1], "events");
  	expect(typeof(events)).toBe('object');
  	events = $._data(children[2], "events");
  	expect(typeof(events)).toBe('object');
   	
	});
});

describe("testing validation functions" , function () {
	it("Validate.filename: Should throw an error if not a valid filename", function () {
		var testStringError = "<script>";
		expect(function () { Validate.fileName(testStringError) }).toThrow(new Error("Only letters, numbers, spaces."));
		
		testStringError = "ab";
		expect(function () { Validate.fileName(testStringError) }).toThrow(new Error("Filename should have more than 3 letters."));
	
		expect(function () { Validate.currentUser(testStringError) }).toThrow(new Error("You must be logged in!"));

	});
});