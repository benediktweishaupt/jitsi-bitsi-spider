import { c as create_ssr_component, e as each, d as escape, v as validate_component } from "../../../chunks/index.js";
const StudioMoniker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let letters = ["M", "o", "n", "i", "k", "e", "r", "&#9632;", "&#9679;", "&#9650;"];
  return `<article id="canvas" class="canvas h-screen w-screen bg-slate-700">${each(letters, (letter, index) => {
    return `<div class="letter absolute ml-[-25vh] mt-[-25vh] text-9xl text-[55vh] font-black uppercase text-blue-500 opacity-0 mix-blend-difference" id="${"letter-" + escape(index < 10 ? "0" + index : index, true)}"><p><!-- HTML_TAG_START -->${letter}<!-- HTML_TAG_END --></p>
        </div>`;
  })}</article>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(StudioMoniker, "StudioMoniker").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
