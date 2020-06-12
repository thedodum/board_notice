<template>
  <div class="todoApp">
    <div class="form-group">
      <h1>write</h1>

      <ValidationObserver v-slot="{invalid}">
        <form role="form" @submit.prevent="onSubmit">
          <table class="table text-left">
            <caption></caption>
            <colgroup>
              <col width="150">
              <col>
            </colgroup>
            <tbody>
            <tr>
              <th>제목</th>
              <td>
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control" id="title_notice" v-model="title">
                  <!--<span class="text-danger">{{ errors[0] }}</span>-->
                  <ul class="" style="padding-left: 20px;">
                    <li v-for="(error, i) in errors" class="text-danger" :key="i">{{ error }}</li>
                  </ul>
                </ValidationProvider>
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <ValidationProvider name="email" rules="required|email" :bails="false" v-slot="{ errors }">
                  <input type="text" class="form-control" v-model="email">
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <validation-provider rules="required" v-slot="{errors}">
                  <textarea class="form-control" style="height: 200px;" name="desc_notice" v-model="desc"></textarea>
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td>
                <validation-provider rules="required" v-slot="{errors}">
                  <input type="file" id="file-upload" class="form-control" v-on:change="fileSelect()" ref="listUploadFile">
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </td>
            </tr>
            </tbody>
          </table>

          <div class="clearfix">
            <router-link to="/" tag="button" class="btn btn-default pull-left">list</router-link>
            <!--<button type="submit" v-on:click="addList(title, desc)" class="btn btn btn-primary pull-right">write</button>-->
            <button type="submit" :disabled="invalid" class="btn btn btn-primary pull-right">write</button>
          </div>
        </form>
      </ValidationObserver>

    </div>

  </div>
</template>

<script>
  import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
  // import { required, email } from 'vee-validate/dist/rules';
  import * as rules from 'vee-validate/dist/rules';
  import { messages } from 'vee-validate/dist/locale/ko.json';

  Object.keys(rules).forEach(rule => {
    extend(rule, {
      ...rules[rule], // copies rule configuration
      message: messages[rule] // assign message
    });
  });

  /*for (let [rule, validation] of Object.entries(rules)) {
    extend(rule, {
      ...validation
    });
  }*/

  export default {
    name: 'boardWrite',
    data(){
      return {
        no: '',
        title: '',
        email: '',
        desc: '',
        date: '',
        // arr_list: [],
        listUploadFile: null,
        // value: ''
      }
    },
    mounted(){

    },
    methods:{
      addList (){
          console.log('write');
          this.$http.post('/api/board/write', {
            title: this.title,
            email: this.email,
            desc: this.desc,
            date: new Date().toISOString().substr(0, 10).replace('T', ' '),
            file: this.listUploadFile
          }).then((res) => {
            console.log(res);
            // this.arr_list.push(res.data);
            // this.title = '';
            // this.desc = '';
            // this.$router.push('/');
          }).catch(function (error) {
            console.log(error);
            alert(error);
          })

        // this.submit();
      },
      fileSelect(){
        this.listUploadFile = this.$refs.listUploadFile.files[0];
      },
      /*submit(){
        const formData = new FormData();
        formData.append('listTitle', this.title);
        formData.append('listContents', this.desc);
        formData.append('listUploadFile', this.listUploadFile);

        for (let key of formData.entries()) {
          console.log(key);
        }

        this.$http.post('http://localhost:3000/boardListData', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res);

        }).catch((err) => {
          console.log(err);
        })
      },*/
      onSubmit(){

        this.addList ();
      }
    },
    components: {
      ValidationProvider,
      ValidationObserver
    },
  }
</script>

<style scoped>
  form{width:800px; margin:0 auto;}
</style>
