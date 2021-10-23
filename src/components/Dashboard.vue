
<template>
  <div class="dashboard-container">
    <div class="content" v-for="item, index in [1,2]" :key="index">
      <p class="title">负一层</p>
      <ul class="ul-wrapper">
         <li class="list-item" v-for="list, idx in [1,2,3]" :key="idx">
           <span>A座余位：</span>
           <span>34个</span>
         </li>
       </ul>
    </div>
   
  </div>
</template>

<script lang="ts">
</script>

<style scoped>
.ul-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;
  padding: 0 5%;
}

.content .title {
  position: relative;
  margin-left: 5%;
  font-weight: 600;
}

.content .title::before {
  position: absolute;
  bottom: 3px;
  left: -2px;
  content: '';
  height: 4px;
  width: 48px;
  background: rgb(49 175 243 / 50%);
  border-radius: 16px;
}

.list-item {
  width: 45%;
  height: 80px;
  display: inline-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
  margin-bottom: 20px;
  /* border: 1px solid  rgb(49 175 243 / 20%); */
  border-radius: 16px;
  background: linear-gradient(
      180deg,
      rgb(0,136,204, 0.5) 0.2%,
      rgb(49 175 243 / 20%) 80%
    )
}
</style>
