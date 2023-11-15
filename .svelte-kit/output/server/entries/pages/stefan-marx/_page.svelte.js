import { c as create_ssr_component, e as each, d as escape, h as null_to_empty, v as validate_component } from "../../../chunks/index.js";
const StefanMarx_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bangers&family=Bungee+Inline&family=Ceviche+One&family=Cinzel+Decorative&family=Faster+One&family=Fontdiner+Swanky&family=Hanalei&family=Knewave&family=Kumar+One+Outline&family=Monoton&family=MuseoModerno:wght@900&family=Notable&family=Piedra&family=Shrikhand&family=Spartan:wght@100&family=UnifrakturMaguntia&display=swap');.screen.svelte-eljhj7{-webkit-animation:svelte-eljhj7-flickerAnimation 2ms infinite;-moz-animation:svelte-eljhj7-flickerAnimation 2ms infinite;-o-animation:svelte-eljhj7-flickerAnimation 2ms infinite;animation:svelte-eljhj7-flickerAnimation 2ms infinite}.selected.svelte-eljhj7{display:block}@keyframes svelte-eljhj7-flickerAnimation{0%{opacity:1}50%{opacity:0.2}100%{opacity:1}}@-o-keyframes svelte-eljhj7-flickerAnimation{0%{opacity:1}50%{opacity:0.2}100%{opacity:1}}@-moz-keyframes svelte-eljhj7-flickerAnimation{0%{opacity:1}50%{opacity:0.2}100%{opacity:1}}@-webkit-keyframes svelte-eljhj7-flickerAnimation{0%{opacity:1}50%{opacity:0.2}100%{opacity:1}}",
  map: null
};
const StefanMarx = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const screens = [
    "jitsi bitsi spider #5",
    "Stefan Marx",
    "next Wednesday",
    "Stefan Marx",
    "1st of July",
    "Stefan Marx",
    "22:00",
    "Stefan Marx",
    "about his",
    "Stefan Marx",
    "drawing work",
    "Stefan Marx",
    "about his",
    "Stefan Marx",
    "publications",
    "Stefan Marx",
    "about his",
    "Stefan Marx",
    "cooperations",
    "Stefan Marx",
    "E n t e r",
    "Stefan Marx",
    "next Wednesday",
    "Stefan Marx",
    "1st of July"
  ];
  $$result.css.add(css);
  return `<a id="canvas" class="canvas text-decoration-none flex min-h-screen items-center justify-center bg-black" href="https://www.crowdcast.io/e/jitsi-bitsi-spider-5"><div class="slider">${each(screens, (screen, index) => {
    return `<div class="${escape(null_to_empty(`screen screen-${index + 1} font-impact text-20vh animate-flicker hidden text-center uppercase leading-none text-white`), true) + " svelte-eljhj7"}">${escape(screen)}
            </div>`;
  })}</div>
</a>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(StefanMarx, "StefanMarx").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
