<template>
  <nav class="text-center">
    <paginate
      v-model="page"
      :first-last-button="true"
      :page-count="Number(countTotalPage)"
      :page-range="10"
      :margin-pages="1"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>
  </nav>
</template>

<script>
  export default {
    // name: paginate,
    props:["countTotalPage"],
    data() {
      return {
        page: 1
      }
    },
    methods: {
      clickCallback: function(pageNum){
        // console.log(pageNum);
        this.page = pageNum;
        this.$emit('clickCallback', pageNum);
      }
    }
  }
</script>

<style lang="css">
  .pagination {

  }
  .page-item {

  }
</style>
