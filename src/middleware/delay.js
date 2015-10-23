// delayMiddleware is a redux middleware which defers actions
// from being passed to the next middleware for 250ms.
export default function delayMiddleware(middlewareApi) {
  const DELAY_MS = 250;

  return next => action => {
    console.log('[delay] Derfering action', action);
    setTimeout(() => {
      console.log('[delay] Passing action to next middleware');
      next(action)
    }, DELAY_MS);
  }
}
