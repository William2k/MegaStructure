import express from "express";

import siteModels, { ISitePage, ISite } from "../models/site.model";

const routes = express.Router();
const Site = siteModels.site;
const Page = siteModels.sitePage;

routes.route("/").get((req: any, res) => {
  const currentUser = req.decoded.normalisedUsername;

  (Site as any)
    .find(
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

  (Site as any)
    .find({ $or: [{ owner: currentUser }, { managers: currentUser }] })
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

  (Site as any)
    .find(
      {
        $or: [{ owner: currentUser }, { managers: currentUser }],
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

  (Site as any)
    .findOne(
      {
        name: siteName,
        managers: req.decoded.normalisedUsername,
        pages: { $elemMatch: { pageRef } }
      },
      "pages"
    )
    .then((result, err) => {
      const resultPages = result.pages;

      if (resultPages.length) {
        const updatedPage = resultPages.find(
          (page: ISitePage) => page.pageRef === pageRef
        );
        res.json(updatedPage);
      } else {
        res.status(400).send("Page not found");
      }
    })
    .catch(err => res.status(400).send("Error finding page"));
});

routes.route("/page/:sitename").post((req: any, res) => {
  const currentUser = req.decoded.normalisedUsername as string;
  const page = req.body as ISitePage;
  const sitename = req.params.sitename as string;

  Site.updateOne(
    {
      $or: [{ owner: currentUser }, { managers: currentUser }],
      name: sitename,
      pages: { $elemMatch: { pageRef: page.pageRef } }
    },
    { $set: { "pages.$": page } }
  )
    .then(updatedResult => {
      let documentsFound = updatedResult.n;

      if (documentsFound) {
        return res.status(201).send(page);
      }

      Site.updateOne(
        {
          $or: [{ owner: currentUser }, { managers: currentUser }],
          name: sitename
        },
        {
          $addToSet: { pages: page }
        }
      ).then(savedResult => {
        documentsFound = savedResult.n;

        if (documentsFound) {
          res.status(201).send(page);
        } else {
          res.status(400).send("Error saving page");
        }
      });
    })
    .catch(err => res.status(400).send("Error saving page"));
});

export default routes;
