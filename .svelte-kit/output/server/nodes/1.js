

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1f2bf41a.js","_app/immutable/chunks/index.05388755.js","_app/immutable/chunks/stores.db0c6b09.js","_app/immutable/chunks/singletons.c3e5b5b6.js"];
export const stylesheets = [];
export const fonts = [];
