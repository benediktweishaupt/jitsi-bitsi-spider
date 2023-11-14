<script>
    import {goto} from '$app/navigation';
    // {name: 'Home', path: '/'},

    const routes = [
        {name: 'Marco Land', path: '/MarcoLand'},
        {name: 'Jutta Bauer', path: '/JuttaBauer'},
        {name: 'Nontsikelelo Mutiti', path: '/NontsikeleloMutiti'},
        {name: 'Studio Moniker', path: '/StudioMoniker'},
        {name: 'Stefan Marx', path: '/StefanMarx'},
        {name: 'Prem Krishnamurthy', path: '/PremKrishnamurthy'}
    ];
    function navigateTo(path) {
        goto(path);
    }
</script>

<header class="flex min-w-full items-center justify-between bg-white">
    <div class="flex justify-between">
        <div class="logo">
            <h3 class="p-4 pr-16 text-lg font-bold uppercase leading-4 text-black">
                jitsi <br />bitsi<br />spider
            </h3>
        </div>
        <nav class="flex items-center gap-4">
            {#each routes as route}
                <div
                    class="flex h-8 items-center rounded-full border border-gray-950 bg-gray-50 px-4 font-bold text-gray-800">
                    <a href="#" on:click|preventDefault={() => navigateTo(route.path)}
                        >{route.name}</a>
                </div>
            {/each}
        </nav>
    </div>
    <h3 class="pr-8 text-4xl">🕸️</h3>
</header>
