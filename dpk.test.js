const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given falsy input", () => {
    const trivialKey = deterministicPartitionKey("");
    expect(trivialKey).toBe("0");
  });

  it("Returns the provided partition key if it is a string and doesn't exceed max length", () => {
    const input = {
      partitionKey: "60077fcb-6a9f-482c-999f-33fa1e1eb511",
    };
    const sameKey = deterministicPartitionKey(input);
    expect(sameKey).toBe(input.partitionKey);
  });

  it("Returns a hash of the provided partition key if it is a string which exceeds max length", () => {
    const input = {
      partitionKey:
        "d9c43265-f710-4a2a-b9ba-f8084040bb0fdb652739-adee-4242-8962-6aa60dfc3902a047a6b0-828d-42b0-b85f-ea357996de5fe14b6369-224c-446f-90e0-ab3b1a0c0ed74c97b966-f872-4247-b181-2dd4ef08c5a70c777279-b910-442a-851d-00efff584202ed4ce15b-66ee-4938-8421-ce6dd91a1da84c3c0ee7-b5ca",
    };
    const result = deterministicPartitionKey(input);
    const hash = crypto
      .createHash("sha3-512")
      .update(input.partitionKey)
      .digest("hex");
    expect(result).toBe(hash);
  });

  it("Returns stringified version of provided partition key if it is a number and doesn't exceed max length when stringified", () => {
    const input = {
      partitionKey: 4371284132986,
    };
    const stringifiedKey = deterministicPartitionKey(input);
    expect(stringifiedKey).toBe(JSON.stringify(input.partitionKey));
  });

  it("Returns stringified version of provided partition key if it is an object and doesn't exceed max length when stringified", () => {
    const input = {
      partitionKey: {
        foo: "60077fcb-6a9f-482c-999f-33fa1e1eb511",
        bar: [1, 2, 3],
        baz: Symbol("123"),
      },
    };
    const stringifiedKey = deterministicPartitionKey(input);
    expect(stringifiedKey).toBe(JSON.stringify(input.partitionKey));
  });

  it("Returns a hash of provided partition key if it is not a string and exceeds max length when stringified", () => {
    const input = {
      partitionKey: {
        foo: "43712841329864371284132986437128413298643712841329864371284132986437128413298643712841329864371284132986437128413298643712841329864371284132986437128413298643712841329864371284132986437128413298643712841329864371284132986437128413298643712841329864371284132986",
      },
    };
    const result = deterministicPartitionKey(input);
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(input.partitionKey))
      .digest("hex");
    expect(result).toBe(hash);
  });

  it("Returns a hash of the argument if called with a primitive value", () => {
    const input = 15;
    const result = deterministicPartitionKey(input);
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(input))
      .digest("hex");
    expect(result).toBe(hash);
  });

  it("Returns a hash of the object passed as argument if partition key is not provided", () => {
    const input = {
      foo: "1",
      bar: 2,
      baz: Symbol("3"),
    };
    const result = deterministicPartitionKey(input);
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(input))
      .digest("hex");
    expect(result).toBe(hash);
  });

  it("Returns a hash of the object passed as argument if the provided partition key is falsy", () => {
    const input = {
      partitionKey: 0,
      foo: "1",
      bar: 2,
      baz: Symbol("3"),
    };
    const result = deterministicPartitionKey(input);
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(input))
      .digest("hex");
    expect(result).toBe(hash);
  });
});
