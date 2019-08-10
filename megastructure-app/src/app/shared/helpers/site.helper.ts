import { SitePage, SitePageTree } from 'src/app/core/models/site.model';

export const pagesArrayToTree = (pages: SitePage[]): SitePageTree => {
  const basePage = pages.find(page => page.pageRef === 1);

  if (!basePage) {
    return null;
  }

  const tree = { page: basePage, subPages: [] } as SitePageTree;

  const allPages = [tree];

  for (const page of pages) {
    let pageTree = allPages.find(p => p.page.pageRef === page.parentRef);

    if (!pageTree) { // This if allows creating the parent from the child page, generally should not be necessary.
      const parentPage = pages.find(
        p => p.pageRef === page.parentRef
      );

      if (!parentPage) {
        continue;
      }
      pageTree = { page: parentPage, subPages: [] } as SitePageTree;

      allPages.push(pageTree);
    }

    const subPage = { page, subPages: [] } as SitePageTree;

    pageTree.subPages.push(subPage);
    allPages.push(subPage);
  }

  return tree;
};
