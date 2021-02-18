<template>
    <client-only>
        <notifications group="All" classes="vue-notification" style="position:absolute" animation-type="velocity"  id="notificationToast"></notifications>
    </client-only>
</template>

<script>


export default {
    name: "NOTIFICATIONHANDLER",
    components: {
        
    },
    data: function () {
        return {
            element: "",
              leave: {
                height: 0,
                opacity: 0
            }
        }
    },
    methods: {
        enter () {
            /*
            *  "element" - is a notification element
            *    (before animation, meaning that you can take it's initial height, width, color, etc)
            */
            let height = 200;

            return {
                // Animates from 0px to "height"
                height: [height, 0],
                // Animates from 0 to random opacity (in range between 0.5 and 1)
                opacity: [Math.random() * 0.5 + 0.5, 0],
                // Animate from right to left
            }  
        },
    },
    mounted () {
        if (process.client)  {
            this.element = document.getElementById('notificationToast')
        }
    }
}
</script>

<style>

</style>