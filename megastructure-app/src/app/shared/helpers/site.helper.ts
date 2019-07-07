import { SitePage, SitePageTree } from 'src/app/core/models/site.model';

export const pagesArrayToTree = (pages: SitePage[]): SitePageTree => {
  const basePage = pages.find(page => page.pageRef === 1);

  if (!basePage) {
    return null;
  }

  const tree = { page: basePage, subPages: [] } as SitePageTree;

  const allPages = [tree] as SitePageTree[];

  for (const page of pages) {
    let pageTree = allPages.find(p => p.page.parentRef === page.pageRef);

    if (!pageTree) {
      const parentPage = pages.find(
        p => p.pageRef === page.parentRef
      ) as SitePage;

      pageTree = { page: parentPage, subPages: [] } as SitePageTree;

      allPages.push(pageTree);
    }

    pageTree.subPages.push({ page, subPages: [] });
  }

  return tree;
};
