<template>
  <div class="todoApp">
    <div class="form-group">
      <h1>list</h1>
    </div>
    <div class="todo-list">
      <!-- todoList 컴포넌트: v-bind(디렉티브) Element 객체의 속성 동적 데이터 바인딩 -->
      <boardList v-bind:currentList="currentList" v-on:del-list="delList" v-on:detail-list="detailList"></boardList>
      <!--<paging v-bind:totalPage="totalPage" v-on:move-page="movePage" />-->
      <paginate v-on:clickCallback="movePage" v-bind:countTotalPage="countTotalPage"></paginate>

      <div class="clearfix">
        <router-link to="/boardWrite" tag="button" class="btn btn-primary pull-right">write</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  // todoList 컴포넌트 import
  import boardList from '@/components/boardList';
  import paginate from "./paginate";

  export default {
    name: 'boardNotice',
    data(){
      return {
        // title: '',
        arr_list: [],
        countTotalList: null,
        countTotalPage: null,
        currentPage: 0,
        listPerPage: 10,
        currentList: []
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      getList(){
        this.$http.get('http://localhost:3000/boardListData')
          .then((res) => {
            console.log(res.data);
            this.arr_list = res.data;
            this.countTotalList = res.data.length;
            // console.log(this.countTotal);
            this.currentList = res.data.slice(this.currentPage, this.listPerPage);

            this.countTotalPage = parseInt(this.countTotalList/this.listPerPage);
            if (this.countTotalList % this.listPerPage > 0) {
              this.countTotalPage++;
            }

            // console.log(this.countTotalPage);
          })
      },
      delList (lst) {
        this.$http.delete('http://localhost:3000/boardListData/' + lst)
          .then((res) => {
            console.log(res.data);
            this.getList();
          })
      },
      detailList (lst) {
        this.$router.push({name: 'boardDetail', params:{'id': lst}})
      },
      movePage(page){
        page -= 1;
        this.currentPage = page;
        this.currentList = this.arr_list.slice(page * 10,  page * 10 + 10);
      }
    },
    components: {
      'boardList': boardList,
      'paginate': paginate
    }
  }
</script>

<style scoped>
  .todoApp {
    /*margin: auto;*/
  }
  form {
    display: block;
  }
  .form-group {
    text-align: center;
    /*margin-top: 10em;*/
    /*padding-bottom: 25px;*/
  }
  .todo-list {
    width: 800px;
    text-align: left;
    margin: 0 auto 100px;
  }
</style>
