<template>
  <div id="app">
    <ul>
        <li
         v-for="user in currentPageUsers" :key="user.id" >
          {{ user.id}}
         {{ user.name }}
          {{ user.gender }}
           {{ user.species }}
           
  
    </li>
    </ul>
      <ul class="pages">
        <li v-for="page in paginatedUsers" :key="page.id" class="inline">
          <button @click="changePage(page.page)">
            {{ page.page }}
             
          </button>
        </li>
      </ul> 
                   
              
    <el-row>
  <el-col :span="6">
    <div class="grid-content bg-purple-dark">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates mollitia voluptatibus distinctio natus placeat ratione accusamus dolorem quibusdam, dolores itaque esse? Facere voluptate voluptas nostrum, modi suscipit enim odit earum fugiat sint magnam! 
      Suscipit accusamus aspernatur ipsum ipsa, ad soluta.
      </div>
      </el-col>
       <el-col :span="6">
    <div class="grid-content bg-purple-dark">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates mollitia voluptatibus distinctio natus placeat ratione accusamus dolorem quibusdam, dolores itaque esse? Facere voluptate voluptas nostrum, modi suscipit enim odit earum fugiat sint magnam! 
      Suscipit accusamus aspernatur ipsum ipsa, ad soluta.
      </div>
      <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="Пароль" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
 </el-form-item>
  
  <el-form-item
    prop="email"
    label="Электронная почта"
    :rules="[
      { required: true, message: 'Введите email адрес', trigger: 'blur' },
      { type: 'email', message: 'Введите корректный email адрес', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  
    <el-button type="primary" @click="submitForm('ruleForm')">Авторизация</el-button>
    
</el-form>  
      </div>
      </el-col>

     
   </el-row>
   <el-container class="container">
     <el-main>
     
      
  <br>
  <el-button type="primary" @click="handleClick">Primary</el-button>
     </el-main>
   </el-container>
  
  

  </div>
</template>

<script>
import axios from 'axios';


export default{
  name:'app',
  data(){
     var validatePass2 = (rule, value, callback) => {
        if (value === '')  {
          callback(new Error('Введите пароль'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('Пароль должен содержать не менее 8 символов'));
        } else {
          callback();
        }
      };
return{
   results: [],
      usersPerPage: 5,
      currentPage: 1,
   ruleForm: {
          pass: '',
          email: ''
                 
        },
         rules: {
          pass: [
            { validator: validatePass2, trigger: 'blur' },
             { required: true, message: 'Пароль должен содержать не менее 8 символов', trigger: 'blur' },
            {  min:8, message: 'Пароль должен содержать не менее 8 символов', trigger: 'blur' }
          ]
        },
       

}
  },
  components:{
 
  },
 
  computed:{
    paginatedUsers() {
      let page = 1;
      return [].concat.apply(
        [],
        this.results.map((user, index) =>
          index % this.usersPerPage
            ? []
            : {
                page: page++,
                results: this.results.slice(index, index + this.usersPerPage),
              }
        )
      );
    },
    currentPageUsers() {
      let currentPageUsers = this.paginatedUsers.find(
        (pages) => pages.page === this.currentPage
      );
      return currentPageUsers ? currentPageUsers.results : [];
    },
  },
  methods:{
  handleClick(){
    console.log('handling');
  },
   submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       changePage(pageNumber) {
      if (pageNumber !== this.currentPage) this.currentPage = pageNumber;
    }
  },
  mounted(){
 
     axios.get("https://rickandmortyapi.com/api/character")
    .then(response => {this.results = response.data.results})
} 
}

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
   background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

li {
  margin: 8px 0;
}
h2 {
  font-weight: bold;
  margin-bottom: 15px;
}
del {
  color: rgba(0, 0, 0, 0.3);
}
li.inline {
  display: inline;
}

.container{
  max-width: 1200px;
  margin:auto;
}
</style>
