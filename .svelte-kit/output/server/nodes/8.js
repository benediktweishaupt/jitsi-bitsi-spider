

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/studio-moniker/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.bd2cee6a.js","_app/immutable/chunks/index.05388755.js","_app/immutable/chunks/scripts.61393e47.js"];
export const stylesheets = [];
export const fonts = [];
