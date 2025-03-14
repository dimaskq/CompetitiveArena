const express = require("express");
const router = express.Router();
const User = require("../models/User");
const requestIp = require("request-ip");

router.post("/", async (req, res) => {
  try {
    const allowedIps = [
      "87.120.167.110:32128",
      "87.120.167.110:32129",
      "87.120.167.110:31275",
      "87.120.167.110:32195",
      "87.120.167.110",
      "54.86.50.139",
      "185.21.52.186",
    ];

    const clientIp = requestIp.getClientIp(req);

    if (!allowedIps.includes(clientIp)) {
      return res.status(403).json({
        message: "Forbidden: Invalid IP address. You are not authorised!",
      });
    }

    const users = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "Invalid data format." });
    }

    const operations = users.map((user) => {
      const updatedServers = [
        {
          solo: user.servers?.[0]?.solo || 0,
          kills: user.servers?.[0]?.kills || 0,
          deaths: user.servers?.[0]?.deaths || 0,
          kd:
            user.servers?.[0]?.deaths > 0
              ? (user.servers?.[0]?.kills / user.servers?.[0]?.deaths).toFixed(
                  2
                )
              : user.servers?.[0]?.kills,
          resources: {
            wood: user.servers?.[0]?.resources?.wood || 0,
            stone: user.servers?.[0]?.resources?.stone || 0,
            metal: user.servers?.[0]?.resources?.metal || 0,
            sulfur: user.servers?.[0]?.resources?.sulfur || 0,
            scrap: user.servers?.[0]?.resources?.scrap || 0,
            hqm: user.servers?.[0]?.resources?.hqm || 0,
          },
        },
        {
          duo: user.servers?.[1]?.duo || 0,
          kills: user.servers?.[1]?.kills || 0,
          deaths: user.servers?.[1]?.deaths || 0,
          kd:
            user.servers?.[1]?.deaths > 0
              ? (user.servers?.[1]?.kills / user.servers?.[1]?.deaths).toFixed(
                  2
                )
              : user.servers?.[1]?.kills,
          resources: {
            wood: user.servers?.[1]?.resources?.wood || 0,
            stone: user.servers?.[1]?.resources?.stone || 0,
            metal: user.servers?.[1]?.resources?.metal || 0,
            sulfur: user.servers?.[1]?.resources?.sulfur || 0,
            scrap: user.servers?.[1]?.resources?.scrap || 0,
            hqm: user.servers?.[1]?.resources?.hqm || 0,
          },
        },
        {
          trio: user.servers?.[2]?.trio || 0,
          kills: user.servers?.[2]?.kills || 0,
          deaths: user.servers?.[2]?.deaths || 0,
          kd:
            user.servers?.[2]?.deaths > 0
              ? (user.servers?.[2]?.kills / user.servers?.[2]?.deaths).toFixed(
                  2
                )
              : user.servers?.[2]?.kills,
          resources: {
            wood: user.servers?.[2]?.resources?.wood || 0,
            stone: user.servers?.[2]?.resources?.stone || 0,
            metal: user.servers?.[2]?.resources?.metal || 0,
            sulfur: user.servers?.[2]?.resources?.sulfur || 0,
            scrap: user.servers?.[2]?.resources?.scrap || 0,
            hqm: user.servers?.[2]?.resources?.hqm || 0,
          },
        },
        {
          squad: user.servers?.[3]?.squad || 0,
          kills: user.servers?.[3]?.kills || 0,
          deaths: user.servers?.[3]?.deaths || 0,
          kd:
            user.servers?.[3]?.deaths > 0
              ? (user.servers?.[3]?.kills / user.servers?.[3]?.deaths).toFixed(
                  2
                )
              : user.servers?.[3]?.kills,
          resources: {
            wood: user.servers?.[3]?.resources?.wood || 0,
            stone: user.servers?.[3]?.resources?.stone || 0,
            metal: user.servers?.[3]?.resources?.metal || 0,
            sulfur: user.servers?.[3]?.resources?.sulfur || 0,
            scrap: user.servers?.[3]?.resources?.scrap || 0,
            hqm: user.servers?.[3]?.resources?.hqm || 0,
          },
        },
      ];

      return {
        updateOne: {
          filter: { steamId: user.steamId },
          update: {
            $set: {
              displayName: user.displayName,
              avatar: user.avatar,
              servers: updatedServers,
            },
          },
          upsert: true,
        },
      };
    });

    const result = await User.bulkWrite(operations);

    res.status(200).json({
      message: `${result.upsertedCount} users created, ${result.modifiedCount} users updated`,
      data: result,
    });
  } catch (error) {
    console.error("Error saving users:", error);
    res.status(500).json({ message: "Error saving users", error });
  }
});

module.exports = router;
