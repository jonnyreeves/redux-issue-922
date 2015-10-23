// Third party module used to handle OAuth, independant of redux.
export const EXPIRED_GRANT = 'expired_grant';
export const VALID_GRANT = 'valid_grant';

export default {
  // authorize obtains a new grant, the returned promise will be resolved when
  // a new grant has been retrieved.
  authorize() {
    // Grant refresh process is (very) async.
    return new Promise(resolve => {
      setTimeout(() => resolve(VALID_GRANT), 1000);
    });
  }
}
