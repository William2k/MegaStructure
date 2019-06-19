import { Site } from 'src/app/core/models/site.model';

export interface State {
  fetchingSites: boolean;
  fetchingPage: boolean;
  savingSite: boolean;
  sites: Site[];
  lastFetch: Date;
  error: string;
}

export const initialState: State = {
  fetchingSites: false,
  fetchingPage: false,
  savingSite: false,
  sites: [],
  lastFetch: null,
  error: ''
};
