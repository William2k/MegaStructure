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
  parentRef: Number,
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

export interface ISite {
  id: string;
  name: string;
  type: string;
  owner: string;
  managers: string[];
  lastModified: { date: Date; user: string };
  basePage: ISitePage;
  isActive: boolean;
  delete: boolean;
}

export enum SiteElementTypes {
  main = "main",
  section = "section",
  div = "div",
  image = "image",
  text = "text"
}

export interface ISitePage {
  pageRef: number;
  title: string;
  link: string;
  content: ISiteElement;
  subPages: ISitePage[];
  isActive: boolean;
  parentRef: number;
  delete: boolean;
}

export interface ISiteElement {
  elementRef: number;
  attributes: IElementAttribute[];
  type: SiteElementTypes;
  textContent: string;
  styles: any;
  location: { x: number; y: number };
  childElements: ISiteElement[];
  changes: { amount: number };
  isActive: boolean;
  delete: boolean;
}

export interface IElementAttribute {
  name: string;
  value: string;
}
