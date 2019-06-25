import express from "express";

import siteModels from "../models/site.model";

const routes = express.Router();
const Site = siteModels.site as any;

routes.route("/live/:sitename").get((req, res) => {
  const siteName = req.params.sitename;

  Site.aggregate([
    { $match: { isActive: true, name: siteName } },
    {
      $project: {
        name: "$name",
        isActive: "$isActive",
        managers: "$managers",
        lastModified: "$lastModified",
        type: "$type",
        pages: {
          $filter: {
            input: "$pages",
            as: "page",
            cond: { $eq: ["$$page.isActive", true] }
          }
        }
      }
    }
  ])
    .then((result, err) => {
      if (result.length) {
        const resultSite = result[0];

        resultSite.pages = resultSite.pages.map(page => {
          page.content = null;
          return page;
        });

        res.json(resultSite);
      } else {
        res.status(400).send("Site not found");
      }
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