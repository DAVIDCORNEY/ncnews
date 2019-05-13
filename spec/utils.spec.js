const { expect } = require("chai");
const { formatDate } = require("../utils/utils");

describe.only("formatDate", () => {
  it("returns a new array when passed an array", () => {
    const input = [];
    const expected = [];
    expect(formatDate(input)).to.eql(expected);
    expect(formatDate(input)).to.not.equal(expected);
  });
  it("returns an array containing an object with a timestamp, formatted to a human readable date ", () => {
    const input = [{ created_at: 1471522072389 }];
    const expected = [{ created_at: "Thu Aug 18 2016" }];
    expect(formatDate(input)).to.eql(expected);
  });
  it("should return an array containing an object of multiple key value pairs, with a timestamp,formatted to a human readable date", () => {
    const input = [{ title: "Running a Node App", created_at: 1471522072389 }];
    const expected = [
      { title: "Running a Node App", created_at: "Thu Aug 18 2016" }
    ];
    expect(formatDate(input)).to.eql(expected);
  });
  it("should return an array containing multiple objects of multiple key value pairs, with a timestamp,formatted to a human readable date", () => {
    const input = [
      { title: "Running a Node App", created_at: 1471522072389 },
      { title: "Running a Java App", created_at: 1481522072389 }
    ];
    const expected = [
      { title: "Running a Node App", created_at: "Thu Aug 18 2016" },
      { title: "Running a Java App", created_at: "Mon Dec 12 2016" }
    ];
    expect(formatDate(input)).to.eql(expected);
  });
  it("returns an array of objects, without mutating the original input array", () => {
    const input = [
      { title: "Running a Node App", created_at: 1471522072389 },
      { title: "Running a Java App", created_at: 1481522072389 }
    ];
    const copyInput = [...input];
    const expected = [
      { title: "Running a Node App", created_at: "Thu Aug 18 2016" },
      { title: "Running a Java App", created_at: "Mon Dec 12 2016" }
    ];
    expect(formatDate(input)).to.eql(expected);
    expect(copyInput).to.eql(input);
  });
});
