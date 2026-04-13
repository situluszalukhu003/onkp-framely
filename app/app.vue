<script setup>
// Mengelola semua unit iklan baru melalui useHead
useHead({
  title: 'HUT ONKP Ke-74 & Rakor Pendeta 2026',
  script: [
    // 1. Iklan Populer (Popunder)
    // {
    //   src: 'https://pl29137121.profitablecpmratenetwork.com/1b/46/0e/1b460e360bf4c87a20fe526e36b9adc2.js',
    //   async: true,
    //   'data-cfasync': 'false'
    // },
    // 2. Iklan Social Bar
    {
      src: 'https://pl29137123.profitablecpmratenetwork.com/74/a1/af/74a1af0fa346fb9a237560914c6e2c07.js',
      async: true,
      'data-cfasync': 'false'
    },
    // 3. Native Banner Script
    {
      src: 'https://pl29137122.profitablecpmratenetwork.com/e99bef41a3376e4909b0e30eb0f1730c/invoke.js',
      async: true,
      'data-cfasync': 'false'
    },
    // 4. Banner Iframe (160x300) - Konfigurasi
    {
      innerHTML: `
        atOptions = {
          'key' : 'a183ef480d49147ba2af44951b79e9a1',
          'format' : 'iframe',
          'height' : 300,
          'width' : 160,
          'params' : {}
        };
      `,
      type: 'text/javascript'
    },
    // 5. Banner Iframe (160x300) - Invoke Script
    {
      src: 'https://www.highperformanceformat.com/a183ef480d49147ba2af44951b79e9a1/invoke.js',
      async: true
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <NuxtLayout>
    

      <NuxtPage />

    
    </NuxtLayout>
  </div>
</template>

<style>
/* Memastikan container iklan Native tampil rapi */
#container-e99bef41a3376e4909b0e30eb0f1730c {
  min-height: 120px;
  width: 100%;
  max-width: 728px;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
</style>