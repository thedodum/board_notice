<template>
    <div>
        <div class="">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="user.userid">
        </div>
        <div class="">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="user.name">
        </div>
        <div class="">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="user.password">
        </div>
        <button v-on:click="signUp">가입하기</button>
    </div>
</template>

<script>
    export default {
        name: "SignUp",
        data: function () {
            return {
                user: {
                    userid: '',
                    name: '',
                    password: ''
                }
            }
        },
        methods: {
            signUp: function () {
                console.log('signUp');
                this.$http.post('/api/users/signUp', {
                    user: this.user
                }).then((res) => {
                    if (res.data.success === true) {
                        alert(res.data.message);
                        this.$router.push('/')
                    }
                    if (res.data.success === false) {
                        alert(res.data.message);
                    }
                })
                .catch(function (error) {
                    // console.log(error);
                    alert(error);
                })
            }
        }
    }
</script>

<style scoped>

</style>