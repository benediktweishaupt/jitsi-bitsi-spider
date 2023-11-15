

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.6976816d.js","_app/immutable/chunks/index.05388755.js","_app/immutable/chunks/singletons.df8c5b34.js","_app/immutable/chunks/stores.e817f9f2.js","_app/immutable/chunks/lecturerData.ccd191d7.js"];
export const stylesheets = ["_app/immutable/assets/0.a2245a20.css"];
export const fonts = [];
