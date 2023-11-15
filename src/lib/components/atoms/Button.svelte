<script>
    /**
     * @type {string} Link
     */
    export let href = '';
    /**
     * @type {boolean} Style button for icon on left
     */
    export let left = false;
    /**
     * @type {boolean} Style button for icon on right
     */
    export let right = false;
    /**
     * Specify the kind of icon
     * @type {'primary' | 'secondary' }
     */
    export let type = 'primary';

    $: xPadding = left ? 'pl-6 pr-8' : right ? 'pr-6 pl-8' : 'px-8';
    $: typeCoding =
        type === 'primary'
            ? 'bg-svelte-600 text-white hover:bg-svelte-700'
            : 'border border-gray-100 bg-gray-100 hover:bg-lime-200';
</script>

<a
    class={`leading-2 inline-block rounded-sm  text-lg font-semibold ${xPadding} ${typeCoding}`}
    {href}
    target="_blank"
    rel="noreferrer">
    <div class="flex items-center gap-1">
        <slot />
    </div>
</a>
