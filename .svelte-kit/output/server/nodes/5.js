

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/marco-land/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.4f0c3e39.js","_app/immutable/chunks/index.05388755.js","_app/immutable/chunks/lecturerData.ccd191d7.js","_app/immutable/chunks/scripts.61393e47.js"];
export const stylesheets = [];
export const fonts = [];
