<template>
  <header class="fixed top-0 z-50 w-full h-16 bg-orange-400 border-white/[0.05] backdrop-blur-xl border-b">
    <nav class="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
      
      <NuxtLink to="/" class="flex items-center gap-3 group cursor-pointer">
        <div class="relative">
          <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <img src="/iconapp.png" alt="Logo" class="relative h-9 w-9 rounded-full border border-slate-700 object-cover" />
        </div>
        
        <div class="flex flex-col leading-tight">
          <span class="text-xl font-bold tracking-tight text-black group-hover:text-indigo-400 transition">
            Framefy<span class="text-indigo-500">.</span>
          </span>
          <span class="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            Bingkai Foto Keren
          </span>
        </div>
      </NuxtLink>

      <div class="hidden md:flex items-center gap-10 text-[12px] font-bold tracking-[0.1em] uppercase">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="text-slate-400 hover:text-white transition-all relative group"
        >
          {{ item.name }}
          <span class="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
        </NuxtLink>
      </div>

      <button 
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden p-2 text-black hover:text-white transition-colors"
        aria-label="Toggle Menu"
      >
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-[#020617] border-b border-slate-800 md:hidden overflow-hidden">
        <div class="flex flex-col p-6 gap-6 shadow-2xl">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path" 
            :to="item.path"
            @click="isMenuOpen = false"
            class="text-sm font-bold tracking-widest text-slate-300 hover:text-indigo-400 uppercase transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
  
  <div class="h-16"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const menuItems = [
  { name: 'Beranda', path: '/' },
  { name: 'Twibbon', path: '#twibbon' },
  { name: 'Tutorial', path: '#tutorial' },
]
</script>

<style scoped>
/* Transisi halus untuk menu mobile */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>