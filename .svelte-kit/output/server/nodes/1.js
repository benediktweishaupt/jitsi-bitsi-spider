

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.cc278e23.js","_app/immutable/chunks/index.05388755.js","_app/immutable/chunks/stores.0401fc74.js","_app/immutable/chunks/singletons.22101ded.js"];
export const stylesheets = [];
export const fonts = [];
