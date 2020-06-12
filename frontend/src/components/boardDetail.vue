<template>
  <div class="todoApp">
    <div class="form-group">
      <h1>view</h1>
    </div>

    <form role="form">

      <table class="table">
        <caption></caption>
        <colgroup>
          <col width="150">
          <col>
        </colgroup>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input type="text" class="form-control" v-model="title">
            </td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>
              <input type="text" class="form-control" v-model="date">
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea class="form-control" style="height: 200px;" v-model="desc"></textarea>
            </td>
          </tr>
          <tr>
            <th>첨부파일</th>
            <td>
              <ul class="list-unstyled">
                <li><a v-bind:href="fileurl" target="_blank">{{filename}}</a></li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="clearfix">
        <router-link to="/" tag="button" class="btn btn-default pull-left">list</router-link>

        <span class="btn btn-success pull-right" v-on:click="editList()">edit</span>
        <span class="btn btn-danger pull-right" v-on:click="delList()">delete</span>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'boardDetail',
    data(){
      return {
        id: this.$route.params.id,
        title: '',
        desc: '',
        date: '',
        filename: '',
        fileurl: ''
      }
    },
    created(){
      // console.log('created');
    },
    beforeDestroy(){
      // console.log('beforeDestroy');
    },
    mounted(){
      // console.log('mounted');
      this.getList();
    },
    methods:{
      getList(){
        // console.log(this.$route.params.id);
        this.$http.get('http://localhost:3000/boardListData/' + this.id)
          .then((res) => {
            this.title = res.data.title;
            this.desc = res.data.desc;
            this.date = res.data.date;
            this.filename = res.data.filename;
            this.fileurl = res.data.fileurl;
          })
      },
      editList () {
        this.$http.patch('http://localhost:3000/boardListData/' + this.id, {
          'title':this.title,
          'desc': this.desc
        }).then((res) => {
            console.log(res.data);
            this.$router.push('/');
          })
      },
      delList () {
        this.$http.delete('http://localhost:3000/boardListData/' + this.id)
          .then((res) => {
            console.log(res.data);
            this.$router.push('/')
          })
      }
    }
  }
</script>

<style scoped>
  form {
    width: 800px;
    text-align: left;
    margin: 0 auto 100px;
  }
</style>
