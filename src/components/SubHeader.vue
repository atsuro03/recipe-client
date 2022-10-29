<template>
    <el-button type="text" class="signout-label" @click="signout">Signout</el-button>
</template>

<script>
    
    import { getAuth, signOut } from "firebase/auth";

    export default {
        name: "SubHeader",
        methods: {
            signout: function () {
                const auth = getAuth();
                signOut(auth).then(() => {
                    this.$router.push('/signin')
                })
            }
        }
    }

</script>

<style scoped>

</style>