<template>
    <div>
        <div class="input_row">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="user.userid">
        </div>
        <div class="input_row">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="user.password">
        </div>
        <button v-on:click="login">로그인</button>
        <a href="/signUp">가입하기</a>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data: function () {
            return {
                user: {
                    userid: '',
                    password: ''
                }
            }
        },
        methods: {
            login: function () {
                this.$http.post('/api/users/login', {
                    user: this.user
                }).then(
                    (res) => {  //로그인 성공
                        alert(res.data.message);
                        // console.log(res.data.success);
                        if (res.data.success){
                            this.$router.push('/userList');
                        }else{
                            this.user.userid = '';
                            this.user.password = '';
                        }
                    },
                    (err) => { // error 를 보여줌
                        console.log(err);
                        alert('Login failed! please check your id or password');
                }).catch(err => {
                    alert(err);
                })
            }
        }
    }
</script>

<style scoped>

</style>