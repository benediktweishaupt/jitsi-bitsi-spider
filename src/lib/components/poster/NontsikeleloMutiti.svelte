<script>
    import {onMount} from 'svelte';
    import {StyleChanger} from '$lib/utilities/scripts.js';
    import {stringToLettersArray} from '$lib/utilities/scripts.js';
    const classNames = ['singleLetter--white', 'singleLetter--black'];
    const colors = ['black', 'white'];
    const borderRadius = ['25vw', '25vw', '25vw', '100vw', '50px', '10vw', '20vw', '10vw', '0'];
    let str = 'Nontsikelelo Mutiti';

    let letters = stringToLettersArray(str);
    const changer = new StyleChanger();
    onMount(() => {
        setInterval(() => {
            // changeFontSize('.singleLetter', 10);
            changer.changeFlex('.singleLetter', 200);
            changer.changeFlex('.letterRow', 100);
            changer.changeClass('.singleLetter', classNames);
            changer.cssGradients('.singleLetter', colors);
            changer.cssGradients('.letterRow', colors);
        }, 1000);

        setInterval(() => {
            changer.changeFontSize('.singleLetter', 1, 40);
            changer.changeBorderRadius('.singleLetter', borderRadius);
        }, 8000);

        changer.cssGradients('.singleLetter', colors);
        changer.cssGradients('.letterRow', colors);
        changer.changeFlex('.singleLetter', 400);
        changer.changeFlex('.letterRow', 100);
        changer.changeFontSize('.singleLetter', 10);
        changer.changeClass('.singleLetter', classNames);
        changer.changeBorderRadius('.singleLetter', borderRadius);
        changer.cssGradients('.singleLetter', colors);
        changer.cssGradients('.letterRow', colors);
    });
</script>

<main class="main">
    <article
        class="filter[blur(1px)] animate-bgpos flex h-screen w-full flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat">
        {#each letters as row}
            <div
                class="letterRow min-w[710px] backdrop-blur[10px] flex flex-grow flex-row justify-between mix-blend-difference transition-all duration-[8000] ease-linear">
                {#each row as letter}
                    <div
                        class="singleLetter letter text[22vh] flex flex-grow items-center justify-evenly overflow-hidden transition-all duration-[8000] ease-linear">
                        <p class="uppercase leading-none">{letter}</p>
                    </div>
                {/each}
            </div>
        {/each}
    </article>
</main>

<style>
    .letterRow {
        mix-blend-mode: difference;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .singleLetter--black,
    .singleLetter--white:hover {
        background-color: white;
        color: black;
    }
    .singleLetter--white,
    .singleLetter--black:hover {
        background-color: black;
        color: white;
    }
</style>
