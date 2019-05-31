const express = require("express");
const routes = express.Router();

let Site = require("../models/site.model");

routes.route("/").get((req, res) => {
  Site.find({ managers: req.decoded.normalisedUsername })
    .then((resultSite, err) => {
      resultSite
        ? res.json(resultSite)
        : res.status(400).send("Site not found");
    })
    .catch(err => res.status(400).send("Error finding site"));
});

// routes.route("/").post((req, res) => {
//   const currentUser = req.decoded.normalisedUsername;
//   let site = new Site(req.body);

//   Site.findOne({ owner: currentUser, name: site.name })
//     .then((resultSite, err) => {
//       if (resultSite) {
//         res.status(400).send("Site already exists");
//       } else {
//         site.owner = currentUser;
//         site.lastModified = { user: currentUser, date: new Date() };

//         site
//           .save()
//           .then(result => res.status(201).json(result))
//           .catch(err => res.status(400).send("Error saving site"));
//       }
//     })
//     .catch(err => res.status(400).send("Error saving site"));
// });

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
    { upsert: true },
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
