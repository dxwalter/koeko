<template>
    <client-only>
        <star-rating :rating=score :show-rating="false" :read-only="true" active-color="#ef860e" :round-start-rating="false"></star-rating>
    </client-only>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
    name: "rating",
    components: {
        StarRating
    },
    props: {
        score: {
            type: Number,
            required: true
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>