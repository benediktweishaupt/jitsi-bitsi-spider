<script>
    import {onMount} from 'svelte';

    import {LetterMover} from '../../utils/scripts.js';

    let letters = ['M', 'o', 'n', 'i', 'k', 'e', 'r', '&#9632;', '&#9679;', '&#9650;'];

    let moveMoniker = new LetterMover();

    onMount(() => {
        moveMoniker.initialize();
    });
</script>

<div class="wrapper">
    <div class="mainWrapper">
        <main class="main">
            <article id="canvas" class="canvas">
                {#each letters as letter, index (letter)}
                    <div
                        class="letter absolute ml-[-25vh] mt-[-25vh] text-9xl text-[55vh] font-black uppercase text-blue-500 opacity-0 mix-blend-difference"
                        id="letter-{index < 10 ? '0' + index : index}">
                        <p>{@html letter}</p>
                    </div>
                {/each}
            </article>
        </main>
    </div>
</div>

<style>
    #canvas {
        /* background-color: black; */
        height: 100%;
        transition: 2s linear;
    }
</style>
