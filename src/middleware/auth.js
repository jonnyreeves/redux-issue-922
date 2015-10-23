import { MAKE_REQUEST, recieveGrant } from '../actions';
import oauth, { EXPIRED_GRANT } from '../util/oauth';

// authMiddleware is a stateful piece of redux middleware which
// signs MAKE_REQUEST actions with a grant.  If the grant is invalid,
// it will detain the request until a valid grant is obtained.
export default function createAuthMiddleware() {
  const detainedActions = [];
  let fetchingNewGrant = false;

  return ({ dispatch, getState /*, subscribe */ }) => next => action => {
    const authState = getState().auth;

    if (action.type == MAKE_REQUEST) {
      console.log('[auth] Signing request');

      if (readGrant(getState) === EXPIRED_GRANT) {
        console.log('[auth] Grant has expired, obtaining a new one');
        detainActionAndObtainNewGrant(action, dispatch, getState);
      }
      else {
        next(sign(action, getState));
      }
    }
    else {
      next(action);
    }
  }

  function detainActionAndObtainNewGrant(action, dispatch, getState) {
    detainedActions.push(action);

    oauth.authorize()
      .then((newGrant) => {
        const recieveGrantAction = recieveGrant(newGrant);

        // Middleware has completed the grant refresh flow, we now need to place
        // the new grant in the store (so future requests will be signed using it)
        console.log('[auth] Got new grant, updating store via dispatch', recieveGrantAction);
        dispatch(recieveGrantAction);

        // Now we want to sign the detained requests with the *new* grant
        // (taking the value from the store); however, the `recieveGrantAction`
        // is currently stuck in the `delayMiddleware`.
        const grantInStoreAfterDispatch = readGrant(getState);

        // This is where I would like to subscribe to the store.
        //
        //   let unsubscribe = subscribe(() => {
        //     if (readGrant(getState) === VALID_GRANT) {
        //       unsubscribe();
        //       global.__endTest(grantInStoreAfterDispatch);
        //     }
        //   });
        //

        // End the test here (see test/issue-922.spec.js)
        if (typeof global.__endTest === 'function') {
          console.log('end test');
          global.__endTest(grantInStoreAfterDispatch);
        }
      })
  }

  function readGrant(getState) {
    return getState().auth.grant;
  }

  function sign(action, getState) {
    return {
      ...action,
      authorization: `Bearer ${readGrant(getState)}`
    }
  }
}
