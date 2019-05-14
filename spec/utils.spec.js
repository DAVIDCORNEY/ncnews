const { expect } = require("chai");
const {
  formatDate,
  renameKeys,
  createRef,
  formatDateandKeys
} = require("../utils/utils");

describe("formatDate", () => {
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

describe("renameKeys", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const input = [];
    const keyToChange = "";
    const newKey = "";
    expect(renameKeys(input, keyToChange, newKey)).to.eql([]);
    expect(renameKeys(input, keyToChange, newKey)).to.not.equal(input);
  });
  it("returns an array of one object with a key value pair, where the key is changed to the passed argument", () => {
    const input = [{ created_by: "tickle122" }];
    const keyToChange = "created_by";
    const newKey = "author";
    expect(renameKeys(input, keyToChange, newKey)).to.eql([
      { author: "tickle122" }
    ]);
    expect(renameKeys(input, keyToChange, newKey)).to.not.equal(input);
  });
  it("returns an array of one object with two key value pairs where the key of one is changed to the passed argument", () => {
    const input = [{ created_by: "tickle122", votes: -1 }];
    const keyToChange = "created_by";
    const newKey = "author";
    expect(renameKeys(input, keyToChange, newKey)).to.eql([
      { author: "tickle122", votes: -1 }
    ]);
    expect(renameKeys(input, keyToChange, newKey)).to.not.equal(input);
  });
  it("returns an array of multiple objects with key value pairs where the required key is changed to the passed argument", () => {
    const input = [
      { created_by: "tickle122", votes: -1 },
      { created_by: "grupmy19", votes: 3 }
    ];
    const keyToChange = "created_by";
    const newKey = "author";
    expect(renameKeys(input, keyToChange, newKey)).to.eql([
      { author: "tickle122", votes: -1 },
      { author: "grupmy19", votes: 3 }
    ]);
    expect(renameKeys(input, keyToChange, newKey)).to.not.equal(input);
  });
  it("returns an array of objects, without mutating the original input array", () => {
    const input = [{ created_by: "tickle122", votes: -1 }];
    const copyInput = [...input];
    const keyToChange = "created_by";
    const newKey = "author";
    expect(renameKeys(input, keyToChange, newKey)).to.eql([
      { author: "tickle122", votes: -1 }
    ]);
    expect(renameKeys(input, keyToChange, newKey)).to.not.equal(input);
    expect(copyInput).to.eql(input);
  });
});

describe("createRef", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
    expect(actual).to.eql(expected);
  });
  it("returns an object of a key value pair based on passed parameters, when passed an array with one object", () => {
    const input = [{ title: "Running a Node App", primary: 1 }];
    const actual = createRef(input, "title", "primary");
    const expected = { "Running a Node App": 1 };
    expect(actual).to.eql(expected);
  });
  it("returns an object of a key value pair based on passed parameters, when passed an array of an object with multiple key value pairs", () => {
    const input = [
      {
        primary: 1,
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body:
          "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: 1471522072389
      }
    ];
    const actual = createRef(input, "title", "primary");
    const expected = { "Running a Node App": 1 };
    expect(actual).to.eql(expected);
  });
  it("returns an object of key value pairs based on passed parameters, when passed an array of objects with multiple key value pairs", () => {
    const input = [
      {
        primary: 1,
        title: "Running a Node App",
        topic: "coding"
      },
      {
        primary: 2,
        title: "Working with Redux",
        topic: "coding"
      }
    ];
    const actual = createRef(input, "title", "primary");
    const expected = { "Running a Node App": 1, "Working with Redux": 2 };
    expect(actual).to.eql(expected);
  });
});

describe("formatDateandKeys", () => {
  it("returns a new array, when passed an array", () => {
    const input = [];
    const expected = [];
    expect(formatDateandKeys(input)).to.eql(expected);
    expect(formatDateandKeys(input)).to.not.equal(expected);
  });
  it("returns a new array with a key value pair of an article id and number based on a lookup object", () => {
    const input = [
      {
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup"
      }
    ];
    const lookup = {
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 1
    };
    const expected = [{ article_id: 1 }];
    expect(formatDateandKeys(input, lookup)).to.eql(expected);
  });
  it("returns a new array with multiple key value pairs including an article id and number based on a lookup object", () => {
    const input = [
      {
        comment_id: 1,
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        author: "tickle122"
      }
    ];
    const lookup = {
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 1
    };
    const expected = [
      {
        comment_id: 1,
        article_id: 1,
        author: "tickle122"
      }
    ];
    expect(formatDateandKeys(input, lookup)).to.eql(expected);
  });
  it("returns a new array with multiple key value pairs including an article id and number based on a lookup object and a time stamp reformatted to a human readable date", () => {
    const input = [
      {
        comment_id: 1,
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_at: 1468087638932
      }
    ];
    const lookup = {
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 1
    };
    const expected = [
      {
        comment_id: 1,
        article_id: 1,
        created_at: "Sat Jul 09 2016"
      }
    ];
    expect(formatDateandKeys(input, lookup)).to.eql(expected);
  });
});
