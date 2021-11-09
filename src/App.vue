<template>
  <div id="app">
    <ul>
        <li
         v-for="(user,index) in currentPageUsers" :key="user.id"
          >
          {{ user.id}}
         {{ user.name }}
          {{ user.gender }}
           {{ user.species }}
         <button class="rm"
         v-on:click="currentPageUsers.splice(index, 1)">&times; </button>
  
    </li>
    </ul>
      <ul class="pages">
        <li v-for="page in paginatedUsers" :key="page.id" class="inline">
          <button @click="changePage(page.page)">
            {{ page.page }}
             
          </button>
        </li>
      </ul> 
   <router-view />                
  </div>
</template>

<script>
import axios from 'axios';

export default{
  name:'app',
  data(){
    
return{
   results: [],
      usersPerPage: 5,
      currentPage: 1      

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


<style lang="scss" scoped>
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
border: 1px solid #ccc;
display:flex;
justify-content: space-between;
padding: .5rem 2 rem;
margin-bottom: 1rem;
margin: 8px 0;
}


li.inline {
  display: inline;
}

.container{
  max-width: 1200px;
  margin:auto;
}
ul{
  list-style:none;
  margin:0;
  padding:0;
}
.rm{
  background: red;
  color: #fff;
  border-radius: 50%;
  font-weight:bold;
}
</style>
