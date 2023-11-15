import { c as create_ssr_component, b as subscribe, v as validate_component, d as escape } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/stores.js";
import { l as lecturerData } from "../../../chunks/lecturerData.js";
const PlaceholderText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div><div class="flex h-full w-screen items-center justify-center"><div class="flex flex-col items-center"><h1 class="text-6xl font-medium uppercase blur-[3px]">${slots.default ? slots.default({}) : ``}</h1>
            <h3 class="text-4xl font-bold blur-[2px]">upload soon</h3></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let lecturer;
  function getLecturerData(dataArray) {
    const id = $page.url.pathname.replace("/", "");
    return dataArray.find((data) => data.slug === id);
  }
  lecturer = getLecturerData(lecturerData);
  console.log(lecturer);
  $$unsubscribe_page();
  return `${validate_component(PlaceholderText, "PlaceholderText").$$render($$result, {}, {}, {
    default: () => {
      return `${escape(lecturer.name)}`;
    }
  })}`;
});
export {
  Page as default
};
