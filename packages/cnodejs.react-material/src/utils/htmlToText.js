const caches = {};

export default html => {
  if (caches[html]) return caches[html];
  const container = document.createElement('div');
  container.innerHTML = html;
  caches[html] = container.innerText;
  return caches[html];
};
