

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.b2a8ac34.js","_app/immutable/chunks/index.05388755.js","_app/immutable/chunks/stores.e817f9f2.js","_app/immutable/chunks/singletons.df8c5b34.js","_app/immutable/chunks/lecturerData.ccd191d7.js"];
export const stylesheets = [];
export const fonts = [];
