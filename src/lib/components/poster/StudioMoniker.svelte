<script>
    import {onMount} from 'svelte';

    import {LetterMover} from '$lib/utilities/scripts.js';

    let letters = ['M', 'o', 'n', 'i', 'k', 'e', 'r', '&#9632;', '&#9679;', '&#9650;'];

    onMount(() => {
        let moveMoniker = new LetterMover('.canvas');
        console.log('hello');
        moveMoniker.initialize();
    });
</script>

<article id="canvas" class="canvas h-screen w-screen bg-slate-700">
    {#each letters as letter, index (letter)}
        <div
            class="letter absolute ml-[-25vh] mt-[-25vh] text-9xl text-[55vh] font-black uppercase text-blue-500 opacity-0 mix-blend-difference"
            id="letter-{index < 10 ? '0' + index : index}">
            <p>{@html letter}</p>
        </div>
    {/each}
</article>
