<script>
    import {page} from '$app/stores';
    import {lecturerData} from '$lib/data/lecturerData.js';
    import PlaceholderText from '$lib/components/atoms/PlaceholderText.svelte';
    let lecturer;
    function getLecturerData(dataArray) {
        const id = $page.url.pathname.replace('/', '');
        return dataArray.find(data => data.slug === id);
    }
    lecturer = getLecturerData(lecturerData);
    console.log(lecturer);
</script>

<PlaceholderText>{lecturer.name}</PlaceholderText>
