<script>
    import {goto} from '$app/navigation';
    import {page} from '$app/stores';
    import {lecturerData} from '$lib/data/lecturerData';

    const routes = lecturerData.slice(0, 6).map(lecturer => ({
        name: lecturer.name,
        path: '/' + lecturer.slug
    }));
    function navigateTo(path) {
        goto(path);
    }
</script>

<header class=" flex items-center justify-between">
    <div class="flex max-w-full justify-between">
        <div class="logo">
            <h3 class="p-2 pr-8 text-lg font-bold uppercase leading-4 text-black">
                jitsi <br />bitsi<br />spider
            </h3>
        </div>
        <div class="nav-container min-w-ful relative flex w-full items-stretch overflow-hidden">
            <nav class="flex items-stretch overflow-x-auto">
                <div class="group flex items-center gap-2 px-8">
                    {#each routes as route}
                        <div
                            class="flex h-7 min-w-min items-center whitespace-nowrap rounded-full border border-gray-950 bg-gray-50 px-4 text-gray-900 transition-all duration-300 ease-in-out group-hover:drop-shadow-lg hover:bg-gray-900 hover:text-gray-50

                        {$page.url.pathname === route.path
                                ? 'border-0 border-none bg-none text-black hover:text-white'
                                : ''}">
                            <a
                                href="#"
                                class="text-sm font-bold"
                                on:click|preventDefault={() => navigateTo(route.path)}
                                >{route.name}</a>
                        </div>
                    {/each}
                </div>
            </nav>
        </div>
    </div>
</header>

<!-- scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-400 hover:scrollbar-track-gray-100 scrollbar-thumb-rounded-full -->

<style>
    /* .nav-container {
        position: relative;
        overflow: hidden;
    } */
    .nav-container::before,
    .nav-container::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 6rem;
        background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
    }
    .nav-container::after {
        right: 0;
        transform: rotateZ(180deg);
    }
</style>
