import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export const siteReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
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
    case ActionTypes.GET_SITES_REQUEST: {
      return {
        ...state,
        fetchingSites: true
      };
    }
    case ActionTypes.GET_SITES_SUCCESS: {
      return {
        ...state,
        fetchingSites: false,
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
    default: {
      return state;
    }
  }
};
