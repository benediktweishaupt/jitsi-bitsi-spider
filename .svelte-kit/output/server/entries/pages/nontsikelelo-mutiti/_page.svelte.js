import { c as create_ssr_component, e as each, d as escape, v as validate_component } from "../../../chunks/index.js";
import { s as stringToLettersArray } from "../../../chunks/scripts.js";
const NontsikeleloMutiti_svelte_svelte_type_style_lang = "";
const css = {
  code: ".letterRow.svelte-yb120d{mix-blend-mode:difference;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}",
  map: null
};
let str = "Nontsikelelo Mutiti";
const NontsikeleloMutiti = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let letters = stringToLettersArray(str);
  $$result.css.add(css);
  return `<main class="main"><article class="filter[blur(1px)] animate-bgpos flex h-screen w-full flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat">${each(letters, (row) => {
    return `<div class="letterRow min-w[710px] backdrop-blur[10px] flex flex-grow flex-row justify-between mix-blend-difference transition-all duration-[8000] ease-linear svelte-yb120d">${each(row, (letter) => {
      return `<div class="singleLetter letter text[22vh] flex flex-grow items-center justify-evenly overflow-hidden transition-all duration-[8000] ease-linear"><p class="uppercase leading-none">${escape(letter)}</p>
                    </div>`;
    })}
            </div>`;
  })}</article>
</main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NontsikeleloMutiti, "NontsikeleloMutiti").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
