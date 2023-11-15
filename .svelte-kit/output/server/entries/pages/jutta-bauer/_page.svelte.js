import { c as create_ssr_component, d as escape, e as each, v as validate_component } from "../../../chunks/index.js";
const englishWords = "talks about her books and her project „corona diary“";
const germanWords = "spricht über ihre Bücher und ihr Projekt „corona diary“";
const Name = " Jutta Bauer";
const Date = " 13.5.2020 22:00h(10 p.m.)CET";
const JuttaBauer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const englishWordsArray = englishWords.split(" ");
  const germanWordsArray = germanWords.split(" ");
  return `<main class="bg-white"><a href="https://meet.jit.si/Jitsi-Bitsi-Spider" title="" target="_blank"><section class="textContainer animate-fadein text-4xl text-red-500"></section>

        <figure class="imageContainer bg-screen bg-pos-[0,0] duration-600 m-0 h-[40vh] w-full bg-red-500 bg-[url('$lib/images/jutta-bauer/jutta-bauer-01.png')] bg-cover bg-no-repeat p-0 transition-all ease-linear"></figure>

        <div class="twoLangHover text-4xl text-green-500"><span>${escape(Name)}</span>
            ${each(englishWordsArray, (word, i) => {
    return `<span class="group"><span class="hidden px-2 group-hover:inline">${escape(word)}</span>
                    <span class="px-2 group-hover:hidden">${escape(germanWordsArray[i])}</span>
                </span>`;
  })}
            <span>${escape(Date)}</span></div></a></main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(JuttaBauer, "JuttaBauer").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
