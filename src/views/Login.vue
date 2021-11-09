<template>
   <div>
       
       <el-row>
  <el-col :span="6">
    <div class="grid-content bg-purple-dark">
     
      </div>
      </el-col>
       <el-col :span="6">
    <div class="grid-content bg-purple-dark">
     
      </div>
      <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
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
  <el-form-item label="Пароль" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
 </el-form-item>
  
 
  
    <el-button type="primary" @click="submitForm('ruleForm')">Авторизация</el-button>   
</el-form>  
      </div>
      </el-col>   
   </el-row>
   <el-container class="container">
     <el-main>     
  <br>
  
     </el-main>
   </el-container>
   <router-link to="/">Главная страница</router-link>
   </div> 
</template>


<script>


export default {
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
      methods:{
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

      }

    }
    
        
    

</script>
