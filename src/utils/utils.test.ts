import { isValidQQNumber } from "./utils";

describe("Validate the QQ number", () => {
  it("A valid QQ number.", () => {
    const validNumbers = [
      "1234",
      "23456",
      "345678",
      "4567890",
      "56789012",
      "678901234",
      "7890123456",
      "89012345678",
    ];

    validNumbers.forEach((number) => {
      const result = isValidQQNumber(number);
      expect(result).toBeTruthy();
    });
  });

  it("QQ number start with 0 is invalid", () => {
    const qqnumber = "012344";
    const result = isValidQQNumber(qqnumber);
    expect(result).toBeFalsy();
  });

  it("QQ number length less than 4 is invalid", () => {
    const qqnumber = "123";
    const result = isValidQQNumber(qqnumber);
    expect(result).toBeFalsy();
  });

  it("QQ number length greater than 14 is invalid", () => {
    const qqnumber = "1234567890123456";
    const result = isValidQQNumber(qqnumber);
    expect(result).toBeFalsy();
  });
});
