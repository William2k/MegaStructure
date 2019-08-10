export interface Site {
  id: string;
  name: string;
  type: string;
  owner: string;
  managers: string[];
  lastModified: { date: Date; user: string };
  pages: SitePage[];
  APIs: API[];
  isActive: boolean;
  delete: boolean;
}

export enum SiteElementTypes {
  main = 'main',
  section = 'section',
  div = 'div',
  image = 'image',
  text = 'text',
  link = 'link'
}

export interface SitePage {
  pageRef: number;
  title: string;
  link: string;
  content: SiteElement;
  parentRef: number;
  APIs: API[];
  isActive: boolean;
  delete: boolean;
}

export interface SiteElement {
  elementRef: number;
  attributes: ElementAttribute[];
  type: SiteElementTypes;
  textContent: string;
  styles: any;
  location: { x: number; y: number };
  childElements: SiteElement[];
  changes: { amount: number };
  isActive: boolean;
  delete: boolean;
}

export interface ElementAttribute {
  name: string;
  value: string;
}

export interface CssStyle {
  name: string;
  value: string;
}

export interface API {
  name: string;
  url: string;
  data: {};
}

export interface SitePageTree {
  page: SitePage;
  subPages: SitePageTree[];
}
