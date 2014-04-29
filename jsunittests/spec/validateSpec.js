describe("testing validation functions" , function () {
	it("Validate.filename: Should throw an error if not a valid filename", function () {
		var testStringError = "<script>";
		expect(function () { Validate.fileName(testStringError) }).toThrow(new Error("Only letters, numbers, spaces."));
		
		testStringError = "ab";
		expect(function () { Validate.fileName(testStringError) }).toThrow(new Error("Filename should have more than 3 letters."));
	
		expect(function () { Validate.currentUser(testStringError) }).toThrow(new Error("You must be logged in!"));

	});
});