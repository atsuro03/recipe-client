<template>
    <div class="signin">
        <h2>Sign in</h2>
        <div class="input-form-wrapper">
            <el-input type="text" placeholder="Username" v-model="username"/>
        </div>
        <div class="input-form-wrapper">
            <el-input type="password" placeholder="Password" v-model="password"/>
        </div>
        <el-button @click="signIn" class="">Signin</el-button>
        <p class="mt-3">アカウントを持っていますか？
            <router-link to="/signup">アカウント作成</router-link>
        </p>
    </div>
</template>

<script>

    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

    export default {
        name: "SigninView",
        data () {
            return {
                username: undefined,
                password: undefined
            }
        },
        methods: {
            signIn: async function () {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, this.username, this.password)
                    .then(() => this.$router.push('/'))
                    .catch(error => {
                        this.$message({
                            showClose: true,
                            message: error,
                            type: 'error'
                        })
                    }) 
            }
        }
    }

</script>

<style scoped lang="scss">
    @import "../styles/base";
</style>