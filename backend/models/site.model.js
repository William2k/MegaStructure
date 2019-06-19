const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SiteElement = new Schema();
SiteElement.add({
  elementRef: Number,
  attributes: Object,
  type: String,
  textContent: String,
  styles: Object,
  location: { x: Number, y: Number },
  childElements: [SiteElement],
  changes: { amount: Number }
});

const SitePage = new Schema({
  pageRef: Number,
  title: String,
  link: String,
  content: SiteElement
});

const Site = new Schema({
  name: String,
  type: String,
  owner: String,
  managers: [String],
  lastModified: { date: Date, user: String },
  pages: [SitePage]
});

const removeId = function() {
  let obj = this.toObject();
  delete obj._id;
  return obj;
};

Site.methods.toJSON = removeId;
SitePage.method.toJSON = removeId;
SiteElement.method.toJSON = removeId;

module.exports = {
  site: mongoose.model("Site", Site),
  sitePage: mongoose.model("SitePage", SitePage),
  siteElement: mongoose.model("SiteElement", SiteElement)
};
