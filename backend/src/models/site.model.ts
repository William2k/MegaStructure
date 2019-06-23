import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SiteElement = new Schema();
SiteElement.add({
  elementRef: Number,
  attributes: [{ name: String, value: String }],
  type: String,
  textContent: String,
  styles: Object,
  location: { x: Number, y: Number },
  childElements: [SiteElement],
  changes: { amount: Number },
  isActive: Boolean
});

const SitePage = new Schema({
  pageRef: Number,
  title: String,
  link: String,
  content: SiteElement,
  isActive: Boolean
});

const Site = new Schema({
  name: String,
  type: String,
  owner: String,
  managers: [String],
  lastModified: { date: Date, user: String },
  pages: [SitePage],
  isActive: Boolean
});

export default {
  site: mongoose.model("Site", Site),
  sitePage: mongoose.model("SitePage", SitePage),
  siteElement: mongoose.model("SiteElement", SiteElement)
};
