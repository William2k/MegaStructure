import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';
import { SitePage } from 'src/app/core/models/site.model';

export const siteReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.GET_LIVE_SITE_REQUEST:
    case ActionTypes.GET_SITE_REQUEST: {
      return {
        ...state,
        fetchingSites: true
      };
    }
    case ActionTypes.GET_SITE_SKIP: {
      return {
        ...state,
        fetchingSites: false
      };
    }
    case ActionTypes.GET_SITE_SUCCESS: {
      return {
        ...state,
        fetchingSites: false,
        sites: [
          ...state.sites.filter(
            site =>
              site.name.toLowerCase() !==
              action.payload.result.name.toLowerCase()
          ),
          action.payload.result
        ]
      };
    }
    case ActionTypes.GET_SITE_FAILURE: {
      return {
        ...state,
        fetchingSites: false,
        error: action.payload.error
      };
    }
    case ActionTypes.GET_SITES_REQUEST: {
      return {
        ...state,
        fetchingSites: true
      };
    }
    case ActionTypes.GET_SITES_SKIP: {
      return {
        ...state,
        fetchingSites: false
      };
    }
    case ActionTypes.GET_SITES_SUCCESS: {
      return {
        ...state,
        fetchingSites: false,
        lastFetch: new Date(),
        sites: [...action.payload.result]
      };
    }
    case ActionTypes.GET_SITES_FAILURE: {
      return {
        ...state,
        fetchingSites: false,
        error: action.payload.error
      };
    }
    case ActionTypes.SAVE_SITE_REQUEST: {
      return {
        ...state,
        savingSite: true
      };
    }
    case ActionTypes.SAVE_SITE_SUCCESS: {
      return {
        ...state,
        savingSite: false,
        sites: [
          ...state.sites.filter(
            site => site.name !== action.payload.result.name
          ),
          action.payload.result
        ]
      };
    }
    case ActionTypes.SAVE_SITE_FAILURE: {
      return {
        ...state,
        savingSite: false,
        error: action.payload.error
      };
    }
    case ActionTypes.GET_LIVE_PAGE_REQUEST:
    case ActionTypes.GET_PAGE_REQUEST: {
      return {
        ...state,
        fetchingPage: true
      };
    }
    case ActionTypes.GET_PAGE_SKIP: {
      return {
        ...state,
        fetchingPage: false
      };
    }
    case ActionTypes.GET_PAGE_SUCCESS: {
      return {
        ...state,
        fetchingPage: false,
        sites: [
          ...state.sites.map(site => {
            if (
              site.name.toLowerCase() === action.payload.sitename.toLowerCase()
            ) {
              const currentPage = site.pages.find(
                page => page.pageRef === action.payload.page.pageRef
              );

              currentPage.content = action.payload.page.content;
            }

            return site;
          })
        ]
      };
    }
    case ActionTypes.GET_PAGE_FAILURE: {
      return {
        ...state,
        fetchingPage: false,
        error: action.payload.error
      };
    }
    case ActionTypes.SAVE_PAGE_REQUEST: {
      return {
        ...state,
        savingSite: true
      };
    }
    case ActionTypes.SAVE_PAGE_SUCCESS: {
      const editedSite = state.sites.find(
        site =>
          site.name.toLowerCase() === action.payload.sitename.toLowerCase()
      );

      let editedPage = editedSite.pages.find(
        page => page.pageRef === action.payload.page.pageRef
      );

      editedPage = { ...editedPage, ...action.payload.page };

      editedSite.pages = [
        ...editedSite.pages.filter(page => page.pageRef !== editedPage.pageRef),
        editedPage
      ].sort((a: SitePage, b: SitePage) => a.pageRef - b.pageRef);

      return {
        ...state,
        savingSite: false
      };
    }
    case ActionTypes.SAVE_PAGE_FAILURE: {
      return {
        ...state,
        savingSite: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
};
