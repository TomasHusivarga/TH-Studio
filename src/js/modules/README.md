# Frontend behavior modules

`main.js` should stay as the orchestration layer. Keep feature logic in these focused modules so future animation and UI changes do not fight each other.

Guidelines:

- Add new scroll effects as separate modules, then initialize them from `main.js`.
- Keep mobile behavior explicit. Advanced scroll effects should usually disable below `900px` unless tested.
- Respect `getMotionPreferences()` for effects that move, pin, parallax, or animate continuously.
- Animate `opacity` and `transform` where possible. Avoid animating layout properties such as width, height, top, or left.
- Do not attach new global scroll listeners unless the effect cannot use `IntersectionObserver` or the existing GSAP ticker.
- Keep form, navigation, FAQ, carousel, and animation logic in separate modules.
