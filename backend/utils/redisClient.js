const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://default:KZvW4Bec92TEIcTcdI05lRhOR93pq3RU@redis-15746.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:15746",
});

redisClient.on("error", (err) => console.log("Redis Client Error:", err));

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Connected to Redis");
  }
};

module.exports = {
  connectRedis,
  client: redisClient,
};
