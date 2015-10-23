import { expect } from 'chai';
import store from '../index';
import { VALID_GRANT } from '../src/util/oauth';
import { makeRequest } from '../src/actions.js'

describe('issue 922, stateful async middleware', () => {
  it('should be able to subscribe to store updates to know when the stores state has been updated after an action has been dispatched', (done) => {

    // Called by `src/middleware/auth.js`.
    global.__endTest = (grantInStoreAfterDispatch) => {
      let error;

      try {
        expect(grantInStoreAfterDispatch).to.equal(VALID_GRANT);
      }
      catch (e) {
        error = e;
      }
      finally {
        done(error);
      }
    }

    // Kick off the flow:
    // - makeRequest -> auth -> grant refresh -> recieveGrant -> delay middleware -> reducer
    store.dispatch(makeRequest());
  })

});
