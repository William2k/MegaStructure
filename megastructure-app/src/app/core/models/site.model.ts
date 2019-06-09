export interface Site {
  id: string;
  name: string;
  type: string;
  owner: string;
  managers: [string];
  lastModified: { date: Date; user: string };
  pages: SitePage[];
}

export enum SiteElementTypes {
  main = 'main',
  section = 'section',
  div = 'div',
  image = 'img',
  text = 'span'
}

export interface SitePage {
  pageRef: number;
  title: string;
  link: string;
  content: SiteElement;
}

export interface SiteElement {
  elementRef: number;
  attributes: {};
  type: SiteElementTypes;
  textContent: string;
  location: { x: number; y: number };
  childElements: SiteElement[];
}
