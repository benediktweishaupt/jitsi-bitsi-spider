

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_slug_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.f63094d5.js","_app/immutable/chunks/index.05388755.js","_app/immutable/chunks/stores.0401fc74.js","_app/immutable/chunks/singletons.22101ded.js","_app/immutable/chunks/lecturerData.ccd191d7.js"];
export const stylesheets = [];
export const fonts = [];
