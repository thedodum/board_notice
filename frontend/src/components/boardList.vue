<template>
  <div>
    <table class="table table-hover">
      <caption></caption>
      <colgroup>
        <col width="50">
        <col width="*">
        <col width="100">
        <col width="80">
      </colgroup>
      <thead>
        <tr>
          <th class="text-center">번호</th>
          <th class="text-center">제목</th>
          <th class="text-center">작성일</th>
          <th class="text-center">첨부파일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(lst, i) in currentList" v-on:click="detailList(lst.id)" :key="i">
          <td class="text-center">{{i}}</td>
          <td>{{lst.title}}</td>
          <td class="text-center">{{lst.date}}</td>
          <td class="text-center">
            <span class="ico" v-if="lst.filename"><img src="../assets/ico_file.png" alt=""></span>
          </td>
        </tr>
      </tbody>
    </table>



  </div>
</template>

<script>
  export default {
    name: 'boardList',
    props: ['currentList'],
    mounted(){
      this.dataConfirm();
    },
    methods: {
      dataConfirm(){

      },
      detailList(lst){
        this.$emit('detail-list', lst)
      }
    }
  };
</script>
