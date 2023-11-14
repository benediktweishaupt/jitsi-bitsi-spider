<script>
    import {onMount} from 'svelte';
    import {ScreenUpdater} from '../../utils/scripts.js';

    let screenUpdater;

    const colorArray = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857',
        'red',
        'yellow'
    ];
    const fontArray = [
        'Archivo Black',
        'Bangers',
        'Bungee Inline',
        'Ceviche One',
        'Cinzel Decorative',
        'Faster One',
        'Fontdiner Swanky',
        'Hanalei',
        'Knewave',
        'Kumar One Outline',
        'Monoton',
        'MuseoModerno',
        'Notable',
        'Piedra',
        'Shrikhand',
        'Spartan',
        'UnifrakturMaguntia'
    ];
    const screens = [
        'jitsi bitsi spider #5',
        'Stefan Marx',
        'next Wednesday',
        'Stefan Marx',
        '1st of July',
        'Stefan Marx',
        '22:00',
        'Stefan Marx',
        'about his',
        'Stefan Marx',
        'drawing work',
        'Stefan Marx',
        'about his',
        'Stefan Marx',
        'publications',
        'Stefan Marx',
        'about his',
        'Stefan Marx',
        'cooperations',
        'Stefan Marx',
        'E n t e r',
        'Stefan Marx',
        'next Wednesday',
        'Stefan Marx',
        '1st of July'
    ];

    onMount(() => {
        screenUpdater = new ScreenUpdater(colorArray, fontArray);
        screenUpdater.initialize();
    });
</script>

<a
    id="canvas"
    class="canvas text-decoration-none flex min-h-screen items-center justify-center bg-black"
    href="https://www.crowdcast.io/e/jitsi-bitsi-spider-5">
    <div class="slider">
        {#each screens as screen, index}
            <div
                class={`screen screen-${
                    index + 1
                } font-impact text-20vh animate-flicker hidden text-center uppercase leading-none text-white`}>
                {screen}
            </div>
        {/each}
    </div>
</a>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bangers&family=Bungee+Inline&family=Ceviche+One&family=Cinzel+Decorative&family=Faster+One&family=Fontdiner+Swanky&family=Hanalei&family=Knewave&family=Kumar+One+Outline&family=Monoton&family=MuseoModerno:wght@900&family=Notable&family=Piedra&family=Shrikhand&family=Spartan:wght@100&family=UnifrakturMaguntia&display=swap');

    .screen {
        -webkit-animation: flickerAnimation 2ms infinite;
        -moz-animation: flickerAnimation 2ms infinite;
        -o-animation: flickerAnimation 2ms infinite;
        animation: flickerAnimation 2ms infinite;
    }

    .selected {
        display: block;
    }

    @keyframes flickerAnimation {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
    @-o-keyframes flickerAnimation {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
    @-moz-keyframes flickerAnimation {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
    @-webkit-keyframes flickerAnimation {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
</style>
