const express = require("express");
const routes = express.Router();

const siteModels = require("../models/site.model");

let Site = siteModels.site;

routes.route("/").get((req, res) => {
  Site.find({ managers: req.decoded.normalisedUsername })
    .then((resultSite, err) => {
      resultSite
        ? res.json(resultSite)
        : res.status(400).send("Site not found");
    })
    .catch(err => res.status(400).send("Error finding site"));
});

routes.route("/").post((req, res) => {
  const currentUser = req.decoded.normalisedUsername;
  let site = req.body;
  site.lastModified = { user: currentUser, date: new Date() };
  const managers = [...site.managers, currentUser];
  site.managers = [...new Set(managers)];

  Site.findOneAndUpdate(
    {
      $or: [{ owner: currentUser }, { managers: currentUser }],
      name: site.name
    },
    site,
    { upsert: true, new: true },
    (err, resultSite) => {
      if (resultSite) {
        res.status(201).json(resultSite);
      } else {
        res.status(400).send("Error saving site");
      }
    }
  );
});

routes.route("/page/:sitename").post((req, res) => {
  const currentUser = req.decoded.normalisedUsername;
  const page = req.body;
  const site = {
    name: req.params.sitename,
    lastModified: { user: currentUser, date: new Date() },
    $addToSet : {pages: page}
  };

  Site.findOneAndUpdate(
    {
      $or: [{ owner: currentUser }, { managers: currentUser }],
      name: site.name
    },
    site,
    { upsert: true, new: true },
    (err, resultSite) => {
      if (resultSite) {
        res.status(201).json(resultSite);
      } else {
        res.status(400).send("Error saving site");
      }
    }
  );
});

module.exports = routes;
