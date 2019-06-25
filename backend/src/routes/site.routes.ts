import express from "express";

import siteModels from "../models/site.model";

const routes = express.Router();
const Site = siteModels.site as any;

routes.route("/").get((req: any, res) => {
  const currentUser = req.decoded.normalisedUsername;

  Site.find(
    { $or: [{ owner: currentUser }, { managers: currentUser }] },
    { "pages.content": 0 }
  )
    .then((resultSite, err) => {
      resultSite
        ? res.json(resultSite)
        : res.status(400).send("Sites not found");
    })
    .catch(err => res.status(400).send("Error finding sites"));
});

routes.route("/full").get((req: any, res) => {
  const currentUser = req.decoded.normalisedUsername;

  Site.find({ $or: [{ owner: currentUser }, { managers: currentUser }] })
    .then((resultSite, err) => {
      resultSite
        ? res.json(resultSite)
        : res.status(400).send("Sites not found");
    })
    .catch(err => res.status(400).send("Error finding sites"));
});

routes.route("/:sitename").get((req: any, res) => {
  const currentUser = req.decoded.normalisedUsername;
  const siteName = req.params.sitename;

  Site.find(
    {
      $or: [
        { owner: currentUser },
        { managers: currentUser }
      ],
      name: siteName
    },
    { "pages.content": 0 }
  )
    .then((resultSite, err) => {
      resultSite.length
        ? res.json(resultSite[0])
        : res.status(400).send("Site not found");
    })
    .catch(err => res.status(400).send("Error finding site"));
});

routes.route("/").post((req: any, res) => {
  const currentUser = req.decoded.normalisedUsername;
  const site = req.body;
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

routes.route("/:sitename/page/:pageref").get((req: any, res) => {
  const siteName = req.params.sitename;
  const pageRef = Number(req.params.pageref);

  Site.aggregate([
    {
      $match: {
        name: siteName,
        managers: req.decoded.normalisedUsername,
        pages: { $elemMatch: { pageRef } }
      }
    },
    { $project: { page: { $arrayElemAt: ["$pages", 0] } } }
  ])
    .then((resultPages, err) => {
      resultPages.length
        ? res.json(resultPages[0].page)
        : res.status(400).send("Page not found");
    })
    .catch(err => res.status(400).send("Error finding page"));
});

routes.route("/page/:sitename").post((req: any, res) => {
  const currentUser = req.decoded.normalisedUsername;
  const page = req.body;
  const site = {
    name: req.params.sitename,
    lastModified: { user: currentUser, date: new Date() },
    $addToSet: { pages: page }
  };

  Site.findOneAndUpdate(
    {
      $or: [{ owner: currentUser }, { managers: currentUser }],
      name: site.name
    },
    site,
    { upsert: true, new: true }
  )
    .then((err, resultSite) => {
      if (resultSite) {
        res.status(201).json(resultSite);
      } else {
        res.status(400).send("Error saving site");
      }
    })
    .catch(err => res.status(400).send("Error saving site"));
});

export default routes;
