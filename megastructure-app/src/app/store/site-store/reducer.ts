import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export const siteReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
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
