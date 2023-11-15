<script>
    import Header from '$lib/components/organisms/Header.svelte';
    import Footer from '$lib/components/organisms/Footer.svelte';
    import '../index.css';
</script>

<!-- can you write me a small navigation listing all routes in subfolders? -->

<main class="flex h-screen flex-col justify-stretch divide-y divide-gray-400">
    <Header />
    <div class="flex grow overflow-hidden bg-gray-950 text-white">
        <slot />
    </div>
    <Footer />
</main>
