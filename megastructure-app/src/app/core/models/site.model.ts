export interface Site {
  id: string;
  name: string;
  type: string;
  owner: string;
  managers: string[];
  lastModified: { date: Date; user: string };
  pages: SitePage[];
}

export enum SiteElementTypes {
  main = 'main',
  section = 'section',
  div = 'div',
  image = 'image',
  text = 'text'
}

export interface SitePage {
  pageRef: number;
  title: string;
  link: string;
  content: SiteElement;
}

export interface SiteElement {
  elementRef: number;
  attributes: object;
  type: SiteElementTypes;
  textContent: string;
  styles: any;
  location: { x: number; y: number };
  childElements: SiteElement[];
  changes: { amount: number };
}
