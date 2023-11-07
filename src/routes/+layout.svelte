<script>
    import Header from '../lib/organisms/Header.svelte';
    import Footer from '../lib/organisms/Footer.svelte';
    import Container from '../lib/utilities/Container.svelte';
    import '../index.css';
</script>

<main class="flex h-auto flex-col justify-between bg-svelte-50 md:h-screen">
    <Header />
    <Container>
        <slot />
    </Container>
    <Footer />
</main>
