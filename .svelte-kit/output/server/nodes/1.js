

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.481747da.js","_app/immutable/chunks/index.05388755.js","_app/immutable/chunks/stores.e817f9f2.js","_app/immutable/chunks/singletons.df8c5b34.js"];
export const stylesheets = [];
export const fonts = [];
