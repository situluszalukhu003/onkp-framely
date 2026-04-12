<template>
  <main
    class="relative min-h-screen bg-[#fffbf8] text-slate-200 font-sans overflow-x-hidden selection:bg-indigo-500/30">

    <div class="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      <div
        class="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-indigo-900 blur-[120px] rounded-full animate-blob">
      </div>
      <div
        class="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/10 blur-[100px] rounded-full animate-blob animation-delay-2000">
      </div>
      <div
        class="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full animate-blob animation-delay-4000">
      </div>

      <div
        class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay">
      </div>
    </div>

    <section class="relative min-h-screen flex items-center justify-center pt-8 pb-20 px-4 md:px-6 bg-sky-950 border-b border-white/[0.05]">
      <div class="max-w-4xl mx-auto text-center flex flex-col items-center w-full">

        <div
          class="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 mb-6 md:mb-8 rounded-full bg-slate-400/[0.03] border border-white/10 backdrop-blur-md text-indigo-400 shadow-xl animate-fade-in-down max-w-[95vw]">
          

          <span
            class="text-[20px] sm:text-[20px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.4em] leading-none whitespace-nowrap overflow-hidden">
            <span class="inline sm:hidden">Gereja ONKP</span>
            <span class="hidden sm:inline">Gereja ONKP (Orahua Niha Keriso Protestan)</span>
          </span>
        </div>

        <h1 class="w-full mb-4 tracking-tight leading-[1.1] text-white animate-slide-up">
          <span
            class="block mb-2 text-indigo-400 font-medium text-2xl sm:text-3xl md:text-4xl [font-family:'Dancing_Script',cursive] [text-shadow:0_0_20px_rgba(129,140,248,0.3)]">
            Sambut & Ramaikan Pelaksanaan
          </span>

          <span
            class="block uppercase text-3xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Rakor Pendeta
          </span>

          <span
            class="block mt-1 md:mt-2 uppercase text-xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.02em] text-white">
            & HUT ONKP <span class="text-indigo-500">Ke-74</span> Tahun
          </span>
        </h1>

        <div class="max-w-2xl mb-4 md:mb-4 animate-fade-in [animation-delay:400ms] px-2">
          <p class="text-sm md:text-base text-slate-400 leading-relaxed font-light">
            Wujudkan kebanggaan dan rasa syukur kita! Mari bersatu semarakkan Rakor Pendeta & HUT ONKP Ke-74 dengan
            memasang Twibbon resmi di media sosial Anda. Dilaksanakan pada
            <span class="text-white font-medium">16-19 April 2026</span> di
            <span class="text-indigo-300 font-semibold border-b border-indigo-500/30 whitespace-nowrap">Jemaat Holi
              Amandraya</span>.
          </p>

          <div
            class="mt-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-[10px] md:text-xs text-slate-500 tracking-wide uppercase">
            <span class="hidden md:block w-8 h-[1px] bg-slate-800"></span>
            <span class="text-center leading-loose">
              Desa Lolomoyo, Kec. Amandraya, Kab. Nias Selatan, Sumatera Utara
            </span>
            <span class="hidden md:block w-8 h-[1px] bg-slate-800"></span>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row gap-4 md:gap-6 items-center animate-fade-in [animation-delay:800ms] w-full sm:w-auto justify-center px-4 sm:px-0">
          <a href="#twibbon"
            class="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all hover:scale-[1.02] active:scale-95 text-sm shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] text-center">
            Mulai Buat Twibbon
          </a>

          <a href="https://maps.app.goo.gl/Xhk8Uq5LDYVB4jAP8" target="_blank"
            class="group w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 rounded-full font-bold transition-all text-sm text-center inline-flex items-center justify-center gap-2">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-4 h-4 text-indigo-400 group-hover:animate-bounce">
              <path fill-rule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clip-rule="evenodd" />
            </svg>

            Petunjuk Lokasi
          </a>
        </div>

      </div>
    </section>

    <TwibbonEditor />

    <section id="tutorial" class="relative py-20 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50">
  <!-- Decorative elements -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute -top-20 -left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    <div class="absolute top-40 -right-20 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
    <div class="absolute -bottom-32 left-1/3 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
  </div>

  <div class="max-w-6xl mx-auto px-6 relative z-10">
    <!-- Header lebih ceria -->
    <div class="mb-12 text-center">
      <div class="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm mb-4">
        <span class="text-2xl">🎉</span>
        <span class="text-amber-700 font-semibold text-sm tracking-wide">Mudah & Seru!</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
        Panduan <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Penggunaan</span>
      </h2>
      <div class="h-1 w-24 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full mt-4"></div>
      <p class="text-amber-800/70 mt-3 text-sm max-w-md mx-auto">Ikuti 4 langkah mudah di bawah ini, ya!</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Card 1 -->
      <div class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-110 transition-transform">
            1
          </div>
          <span class="text-2xl">📸</span>
        </div>
        <h3 class="text-amber-800 font-bold text-lg mb-2">Pilih Foto</h3>
        <p class="text-amber-700/70 text-sm leading-relaxed">
          Klik tombol <span class="font-semibold text-orange-600">“PILIH FOTO”</span> dan ambil foto terbaik dari galeri atau kamera kamu.
        </p>
      </div>

      <!-- Card 2 -->
      <div class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-110 transition-transform">
            2
          </div>
          <span class="text-2xl">🎯</span>
        </div>
        <h3 class="text-amber-800 font-bold text-lg mb-2">Atur Posisi</h3>
        <p class="text-amber-700/70 text-sm leading-relaxed">
          Geser, <span class="font-semibold text-orange-600">zoom (pinch)</span>, atau putar fotomu agar pas di dalam bingkai keren.
        </p>
      </div>

      <!-- Card 3 -->
      <div class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-110 transition-transform">
            3
          </div>
          <span class="text-2xl">💾</span>
        </div>
        <h3 class="text-amber-800 font-bold text-lg mb-2">Unduh Hasil</h3>
        <p class="text-amber-700/70 text-sm leading-relaxed">
          Klik <span class="font-semibold text-orange-600">“UNDUH HASIL HD”</span> — gambar HD 1200px akan tersimpan otomatis.
        </p>
      </div>

      <!-- Card 4 -->
      <div class="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-110 transition-transform">
            4
          </div>
          <span class="text-2xl">🚀</span>
        </div>
        <h3 class="text-amber-800 font-bold text-lg mb-2">Bagikan</h3>
        <p class="text-amber-700/70 text-sm leading-relaxed">
          Pakai tagar <span class="font-semibold text-indigo-600">#TwibbonCeria</span> dan bagikan ke medsosmu. Biar makin rame!
        </p>
      </div>
    </div>

    <!-- Catatan ceria -->
    <div class="mt-12 p-5 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 shadow-sm max-w-2xl mx-auto lg:mx-0">
      <div class="flex items-start gap-3">
        <span class="text-2xl">💡</span>
        <p class="text-amber-800 text-sm leading-relaxed">
          <span class="font-bold">Catatan ceria:</span> Jika tombol unduh belum merespon, coba refresh halaman atau gunakan Chrome / Safari ya. Pastikan foto yang dipilih tidak terlalu besar (max 10 MB).
        </p>
      </div>
    </div>

    <!-- Tambahan little joke / motivasi -->
    <div class="text-center mt-8">
      <p class="text-amber-700/60 text-xs inline-flex items-center gap-1 bg-white/40 rounded-full px-3 py-1">
        <span>✨</span> Selamat berkarya! <span>😊</span>
      </p>
    </div>
  </div>
</section>

  </main>
</template>

<script setup>

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');

main {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Luxury Blob Animation */
.animate-blob {
  animation: blob 10s infinite alternate;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Entry Animations */
.animate-slide-up {
  animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1.2s ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}



</style>