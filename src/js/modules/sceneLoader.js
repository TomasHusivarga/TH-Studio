export function initScene() {
  import('../gl/Scene.js').then(({ default: Scene }) => {
    new Scene();
  });
}
