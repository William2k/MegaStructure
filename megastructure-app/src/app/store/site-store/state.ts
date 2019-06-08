import { Site } from 'src/app/core/models/site.model';

export interface State {
  fetchingSites: boolean;
  savingSite: boolean;
  sites: Site[];
  lastFetch: Date;
  error: string;
}

export const initialState: State = {
  fetchingSites: false,
  savingSite: false,
  sites: [],
  lastFetch: null,
  error: ''
};
