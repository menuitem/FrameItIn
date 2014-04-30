describe("testing changing themes" , function () {
	it("ChangeTheme.changetheme: Should retrieve a theme from local storage", function () {
		
		//test that the localStorage API has been called
		var myMock1 = sinon.mock(localStorage);
		myMock1.expects("getItem").once();
		ChangeTheme.changeTheme();
		expect(myMock1.verify()).toBe(true);

	});

});