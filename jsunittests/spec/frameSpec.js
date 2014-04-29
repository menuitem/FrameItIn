//this tests the following functions:
//FrameItIn.canvasToImage()
//FrameItIn.getCanvasFromCamera()
//FrameItIn.getAlertDiv()
//FrameItIn.getLinks()
//FrameItIn.getFileNameDiv()


describe("testing functions that use html canvases in frame.js" , function () {
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

describe("testing functions that create new dom elements in frame.js" , function () {
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
    //div should have 3 children that have href links
  	var children = testdiv.childNodes;
  	expect(children.length).toBe(3);
  	expect(children[0].tagName.toLowerCase()).toBe("a");
  	expect(children[0].getAttribute("title")).toBe("Select for edit.");
    
  	expect(children[1].tagName.toLowerCase()).toBe("a");
  	expect(children[1].getAttribute("title")).toBe("Save to the drive.");
    
  	expect(children[2].tagName.toLowerCase()).toBe("a");
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
    $.each(events, function(i){
      expect(i).toBe('click');   
    });

  	events = $._data(children[2], "events");
  	expect(typeof(events)).toBe('object');
    $.each(events, function(i){
      expect(i).toBe('click');   
    });
       	
	});

});