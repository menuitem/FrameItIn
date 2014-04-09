
describe("My Calculator", function () {
    it("should add 2 numbers together", function () {
        //basic add
        expect(Calculator.add(2, 2)).toBe(4);
        //negative numbers
        expect(Calculator.add(-2, 2)).toBe(0);
        //non numbers
        expect(function () { Calculator.add("hello", "xyz") }).toThrow(new Error("Not a number"));
        //number exceeds maximum of 10000000000
        expect(function () { Calculator.add(10000000001, 10) }).toThrow(new Error("Number exceeds maximum length"));
    });

    it("should subtract 2 numbers", function () {
        //basic subtract
        expect(Calculator.subtract(4.5, 2)).toBe(2.5);
        //negative numbers
        expect(Calculator.subtract(-2, -2)).toBe(0);
        //non numbers
        expect(function () { Calculator.subtract("hello", "xyz") }).toThrow(new Error("Not a number"));
        //number exceeds maximum of 10000000000
        expect(function () { Calculator.subtract(10000000001, 10) }).toThrow(new Error("Number exceeds maximum length"));
    });

    it("should multiply 2 numbers", function () {
        //basic mutiply
        expect(Calculator.multiply(4.1, 2)).toBe(8.2);
        //multiply by zero should return zero
        expect(Calculator.multiply(-2, 0)).toBe(0);
        //non numbers
        expect(function () { Calculator.multiply("hello", "xyz") }).toThrow(new Error("Not a number"));
        //number exceeds maximum of 10000000000
        expect(function () { Calculator.multiply(10000000001, 10) }).toThrow(new Error("Number exceeds maximum length"));
    });

    it("should divide 2 numbers", function () {
        //basic divide
        expect(Calculator.divide(10, 2)).toBe(5);
        //divide by zero should return error
        expect(function () { Calculator.divide(10, 0) }).toThrow(new Error("Division By Zero"));
        //non numbers should return error
        expect(function () { Calculator.divide("hello", "xyz") }).toThrow(new Error("Not a number"));
        //number exceeds maximum of 10000000000
        expect(function () { Calculator.divide(10000000001, 10) }).toThrow(new Error("Number exceeds maximum length"));
    });

});