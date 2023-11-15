import { c as create_ssr_component, f as add_attribute, v as validate_component } from "../../../chunks/index.js";
import { l as lecturerData } from "../../../chunks/lecturerData.js";
import { d as dataToStrings } from "../../../chunks/scripts.js";
const MarcoLand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  dataToStrings(lecturerData[0]);
  let container;
  return `<div${add_attribute("this", container, 0)}></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MarcoLand, "MarcoLand").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
