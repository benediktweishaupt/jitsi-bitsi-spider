<script>
    import {onMount} from 'svelte';
    import {JBauerAnimation} from '../../utils/scripts.js';

    const englishWords = 'talks about her books and her project „corona diary“';
    const germanWords = 'spricht über ihre Bücher und ihr Projekt „corona diary“';
    const Name = ' Jutta Bauer';
    const Date = ' 13.5.2020 22:00h(10 p.m.)CET';

    const englishWordsArray = englishWords.split(' ');
    const germanWordsArray = germanWords.split(' ');

    const longDescriptionGer =
        '"Ich bin Jutta Bauer und werde meine Arbeit als Illustratorin und Autorin vorstellen. Ich kann etwas zu meiner Entwicklung sagen und was mir wichtig ist, sowie einige Bücher zeigen und erzählen, wie die Geschichten und die Bilder entstanden sind. Mit was ich mich im Moment beschäftige könnte vielleicht auch interessant sein. Am Ende würde ich gern Raum lassen für Gespräch und Fragen."';

    let animation;

    onMount(() => {
        animation = new JBauerAnimation();
        animation.initialize('.textContainer', '.imageContainer', longDescriptionGer);
    });
</script>

<main class=" bg-white">
    <a href="https://meet.jit.si/Jitsi-Bitsi-Spider" title="" target="_blank">
        <section class="textContainer animate-fadein text-4xl text-red-500" />

        <figure
            class="imageContainer bg-screen bg-pos-[0,0] duration-600 m-0 h-[40vh] w-full bg-red-500 bg-[url('$lib/images/jutta-bauer/jutta-bauer-01.png')] bg-cover bg-no-repeat p-0 transition-all ease-linear" />

        <div class="twoLangHover text-4xl text-green-500">
            <span>{Name}</span>
            {#each englishWordsArray as word, i}
                <span class="group">
                    <span class="hidden px-2 group-hover:inline">{word}</span>
                    <span class="px-2 group-hover:hidden">{germanWordsArray[i]}</span>
                </span>
            {/each}
            <span>{Date}</span>
        </div>
    </a>
</main>
