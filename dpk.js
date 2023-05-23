const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const calculateHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return calculateHash(JSON.stringify(event));
  }

  const providedPartitionKey =
    typeof event.partitionKey === "string"
      ? event.partitionKey
      : JSON.stringify(event.partitionKey);

  if (providedPartitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    return calculateHash(providedPartitionKey);
  }

  return providedPartitionKey;
};
