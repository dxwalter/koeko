<template>
    <div>
    <!-- Use the component in the right place of the template -->
        <tiptap-vuetify :value="value" :extensions="extensions" @input="$emit('input', arguments[0])" placeholder="Start typing …"/>
    </div>
</template>
<script>
// import the component and the necessary extensions
import {
    TiptapVuetify,
    
    Bold,
    Italic,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    HardBreak,
    History
} from "tiptap-vuetify";

export default {
    components: { TiptapVuetify },
    props: {
        value: {
        type: String,
        default: ""
        } 
    },
    data: () => ({
        extensions: [
            History,
            Italic,
            ListItem,
            BulletList,
            OrderedList,
            Bold,
            Paragraph,
            HardBreak
        ]
    })
};
</script>