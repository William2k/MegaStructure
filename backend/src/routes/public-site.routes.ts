import express from "express";

import siteModels from "../models/site.model";

const routes = express.Router();
const Site = siteModels.site as any;

routes.route("/live/:sitename").get((req, res) => {
  const siteName = req.params.sitename;

  Site.find(
    {
      isActive: true,
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

routes.route("/live/:sitename/page/:pageref").get((req, res) => {
  const siteName = req.params.sitename;
  const pageRef = Number(req.params.pageref);

  Site.aggregate([
    {
      $match: {
        name: siteName,
        isActive: true,
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

export default routes;
