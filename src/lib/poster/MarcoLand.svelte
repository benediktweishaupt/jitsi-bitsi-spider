<script>
    import {onMount} from 'svelte';

    // // Data of Lecturers
    const data = {
        id: 1,
        name: 'marco land',
        description: 'marco land talks about the project: clubquarantaene.stream',
        streamlink: '#',
        date: 'Wednesday, April 29th',
        time: ' 22:00',
        weblink: 'www.marco.land',
        language: 'deutsch'
    };
    // // All HTML Elements
    const tagArr = [
        'html',
        'body',
        'div',
        'span',
        'applet',
        'object',
        'iframe',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'blockquote',
        'pre',
        'a',
        'abbr',
        'acronym',
        'address',
        'big',
        'cite',
        'code',
        'del',
        'dfn',
        'em',
        'img',
        'ins',
        'kbd',
        'q',
        's',
        'samp',
        'small',
        'strike',
        'strong',
        'sub',
        'sup',
        'tt',
        'var',
        'b',
        'u',
        'i',
        'center',
        'dl',
        'dt',
        'dd',
        'ol',
        'ul',
        'li',
        'fieldset',
        'form',
        'label',
        'legend',
        'table',
        'caption',
        'tbody',
        'tfoot',
        'thead',
        'tr',
        'th',
        'td',
        'article',
        'aside',
        'canvas',
        'details',
        'embed',
        'figure',
        'figcaption',
        'footer',
        'header',
        'hgroup',
        'menu',
        'nav',
        'output',
        'ruby',
        'section',
        'summary',
        'time',
        'mark',
        'audio',
        'video'
    ];

    // // Models the Data to an Array of Strings
    const dataToStrings = function (data) {
        return [
            `Jitsi bitsi spider #${data.id}`,
            `A talk by ${data.name}`,
            `${data.description}`,
            `click to join`,
            `${data.date}`,
            `${data.time}`,
            `${data.weblink}`,
            `the lecture will be in ${data.language}`
        ];
    };

    const MLString = dataToStrings(data);

    const getRandomInt = max => Math.floor(Math.random() * max);

    const wrapInRandomElement = (str, tags) => {
        const randomTag = tags[getRandomInt(tags.length)];
        return `<${randomTag}>${str}</${randomTag}>`;
    };
    let ms = 1000;
    let counter = 0;
    let container;
    let element;
    onMount(() => {
        const interval = setInterval(() => {
            if (counter < MLString.length) {
                element = wrapInRandomElement(MLString[counter], tagArr);
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
