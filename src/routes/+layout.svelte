<script>
    import Header from '../lib/organisms/Header.svelte';
    import Footer from '../lib/organisms/Footer.svelte';
    import Container from '../lib/utilities/Container.svelte';
    import '../index.css';
</script>

<!-- can you write me a small navigation listing all routes in subfolders? -->

<main class="flex h-screen flex-col justify-stretch divide-y divide-gray-400">
    <Header />
    <div class="flex grow overflow-hidden bg-gray-900 text-white">
        <Container>
            <slot />
        </Container>
    </div>
    <Footer />
</main>
