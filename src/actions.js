export const MAKE_REQUEST = 'MAKE_REQUEST';
export const GRANT_UPDATED = 'GRANT_UPDATED';

export function makeRequest() {
  return {
    type: MAKE_REQUEST
  }
}

export function recieveGrant(newGrant) {
  return {
    type: GRANT_UPDATED,
    payload: newGrant
  }
}
