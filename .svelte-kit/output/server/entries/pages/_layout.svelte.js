import { c as create_ssr_component, b as subscribe, e as each, d as escape, v as validate_component } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import { l as lecturerData } from "../../chunks/lecturerData.js";
const Header_svelte_svelte_type_style_lang = "";
const css = {
  code: ".nav-container.svelte-94eck1::before,.nav-container.svelte-94eck1::after{content:'';position:absolute;top:0;bottom:0;width:6rem;background:linear-gradient(to right, white, rgba(255, 255, 255, 0))}.nav-container.svelte-94eck1::after{right:0;transform:rotateZ(180deg)}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const routes = lecturerData.slice(0, 6).map((lecturer) => ({
    name: lecturer.name,
    path: "/" + lecturer.slug
  }));
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<header class="flex items-center justify-between"><div class="flex max-w-full justify-between"><div class="logo"><h3 class="p-2 pr-8 text-lg font-bold uppercase leading-4 text-black">jitsi <br>bitsi<br>spider
            </h3></div>
        <div class="nav-container min-w-ful relative flex w-full items-stretch overflow-hidden svelte-94eck1"><nav class="flex items-stretch overflow-x-auto"><div class="group flex items-center gap-2 px-8">${each(routes, (route) => {
    return `<div class="${"flex h-7 min-w-min items-center whitespace-nowrap rounded-full border border-gray-950 bg-gray-50 px-4 text-gray-900 transition-all duration-300 ease-in-out group-hover:drop-shadow-lg hover:bg-gray-900 hover:text-gray-50 " + escape(
      $page.url.pathname === route.path ? "border-0 border-none bg-none text-black hover:text-white" : "",
      true
    )}"><a href="#" class="text-sm font-bold">${escape(route.name)}</a>
                        </div>`;
  })}</div></nav></div></div></header>

`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="flex min-w-full justify-end bg-gray-900 p-2 text-xs text-gray-300">jitsi bitsi spider is a lecture series initiated by matthias hübner, designs by benedikt
    weishaupt.
</footer>`;
});
const index = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `

<main class="flex h-screen flex-col justify-stretch divide-y divide-gray-400">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
    <div class="flex grow overflow-hidden bg-gray-950 text-white">${slots.default ? slots.default({}) : ``}</div>
    ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Layout as default
};
