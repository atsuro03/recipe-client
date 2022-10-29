<template>
    <div class="signup">
        <h2>Signup</h2>
        <div class="input-form-wrapper">
            <el-input type="text" placeholder="Username" v-model="username"/>
        </div>
        <div class="input-form-wrapper">
            <el-input type="password" placeholder="Password" v-model="password"/>
        </div>

        <el-button @click="signUp">Register</el-button>
        <p class="mt-3">アカウントをお持ちですか？
            <router-link to="/signin">サインイン</router-link>
        </p>
    </div>
</template>

<script>    

    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

    export default {
        name: "SignupView",
        data () {
            return {
                username: undefined,
                password: undefined
            }
        },
        methods: {
            signUp: async function() {
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, this.username, this.password)
                    .then(() => {
                        this.username = undefined
                        this.password = undefined
                        this.$message({
                        showClose: true,
                        message: 'Register User Success!',
                        type: 'success'
                        })
                    })
                    .catch(error => {
                        this.$message({
                        showClose: true,
                        message: error,
                        type: 'error'
                        })
                    })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/base";
</style>