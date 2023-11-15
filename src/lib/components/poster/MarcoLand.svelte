<script>
    import {onMount} from 'svelte';
    import {lecturerData} from '$lib/data/lecturerData.js';
    import {arrayOfTags} from '$lib/data/arrayOfTags.js';
    import {dataToStrings, wrapInRandomElement} from '$lib/utilities/scripts.js';

    const MLString = dataToStrings(lecturerData[0]);

    let ms = 1200;
    let counter = 0;
    let container;
    let element;
    onMount(() => {
        const interval = setInterval(() => {
            if (counter < MLString.length) {
                element = wrapInRandomElement(MLString[counter], arrayOfTags);
                const child = document.createElement('div');
                child.innerHTML = element;
                container.insertAdjacentElement('afterbegin', child);
                counter += 1;
            } else {
                return (counter = 0);
            }
        }, ms);
        return () => clearInterval(interval);
    });
</script>

<div bind:this={container} />
