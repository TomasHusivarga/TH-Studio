export function getMotionPreferences() {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');

  return {
    query,
    get reduced() {
      return query.matches;
    },
  };
}
