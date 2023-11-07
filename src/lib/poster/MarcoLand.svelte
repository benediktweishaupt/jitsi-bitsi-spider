<script>
    import {onMount} from 'svelte';
    import {lecturerData} from '../../data/lecturerData.js';
    import {arrayOfTags} from '../../data/arrayOfTags.js';
    import {dataToStrings} from '../../utils/scripts.js';
    import {wrapInRandomElement} from '../../utils/scripts.js';

    const MLString = dataToStrings(lecturerData);

    let ms = 1000;
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
