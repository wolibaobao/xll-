<template>
  <div id="app">
   
    
  
   <router-view></router-view>

  

  </div>
</template>

<script>
import loGin from './components/login.vue'
import zhuce from './components/zhuce.vue'

export default {
  name: 'App',
  components: {
    'loGin':loGin,
    "zhuce":zhuce
  }
}
</script>


<style>
   *{
     margin: 0;
     padding: 0;
     
   }

  

  
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 8px;  
    height: 5px;  
    background-color: #f1f1f1;  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    
    height: 20px;
    background-color: #333;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px; 
    height: 20px; 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: rgb(72, 175, 222);  
    background-image:-webkit-linear-gradient(45deg, rgba(149, 236, 245, 0.65) 25%, #28b2d2 25%, transparent 50%, rgb(119, 209, 232) 50%, rgb(153, 228, 247) 75%, #14bce600 75%, transparent)
} 
</style>


