import { AccountStoreState } from './account-store';
import { SiteStoreState } from './site-store';

export interface State {
  account: AccountStoreState.State;
  site: SiteStoreState.State;
}
