<template>
  <section id="twibbon" class="relative py-8 md:py-16 overflow-hidden bg-[#105763] border-t border-white/[0.05]">
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

    <div class="max-w-6xl mx-auto px-4 md:px-6">
      <div class="w-full text-center mb-6 md:mb-10 animate-fade-in">
        <h2 class="text-2xl md:text-4xl font-black tracking-tight text-white mb-3 uppercase leading-tight">
          Twibbon <br class="md:hidden" />
          <span class="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Official
            Generator</span>
        </h2>
        <p class="text-slate-400 text-xs md:text-sm font-light leading-relaxed max-w-2xl mx-auto italic opacity-80">
          Unggah foto Anda dan jadilah bagian dari HUT ONKP Ke-74.
        </p>
      </div>

      <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        <!-- Canvas Container - ukuran lebih kecil -->
        <div
          class="w-full max-w-[360px] md:max-w-[400px] lg:max-w-[450px] mx-auto lg:mx-0 flex justify-center animate-slide-up">
          <div
            class="relative group w-full aspect-square rounded-2xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 p-1 shadow-2xl">
            <div class="relative w-full h-full rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm">
              <canvas ref="canvasEl" class="block w-full h-full cursor-grab active:cursor-grabbing touch-none"
                style="touch-action: none;" @pointerdown="onPointerDown" @pointermove="onPointerMove"
                @pointerup="onPointerUp" @wheel.prevent="onWheelZoom" />
              <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/70 z-30">
                <div class="animate-spin h-8 w-8 border-3 border-white border-t-transparent rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <!-- Kontrol -->
        <div class="w-full flex flex-col gap-4 items-center lg:items-start">
          <div class="w-full max-w-xs flex flex-col gap-3">
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
            <button @click="triggerFileInput"
              class="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm tracking-wider transition rounded-xl shadow-lg">
              📷 PILIH FOTO
            </button>
            <button v-if="imageAdded" @click="downloadImage"
              class="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm tracking-wider transition rounded-xl shadow-lg">
              💾 UNDUH HASIL HD
            </button>
            <button v-if="imageAdded" @click="resetCanvas"
              class="w-full px-6 py-3 bg-white/10 hover:bg-red-500/20 text-white text-sm tracking-wider transition rounded-xl">
              🔄 MULAI ULANG
            </button>
          </div>

          <!-- Zoom & Rotasi dengan slider -->
          <div v-if="imageAdded"
            class="w-full max-w-xs flex flex-col gap-4 mt-2 p-4 bg-white/5 rounded-xl border border-white/10">
            <!-- Slider Zoom -->
            <div>
              <div class="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                <span>🔍 ZOOM</span>
                <span>{{ Math.round(scale * 100) }}%</span>
              </div>
              <input type="range" :min="MIN_SCALE" :max="MAX_SCALE" step="0.01" v-model="scale"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              <div class="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>20%</span>
                <span>100%</span>
                <span>400%</span>
              </div>
            </div>

            <button @click="resetZoom"
              class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs transition w-full">
              Reset Zoom ke 100%
            </button>

            <!-- Slider Rotasi -->
            <div>
              <div class="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                <span>🔄 ROTASI</span>
                <span>{{ rotation }}°</span>
              </div>
              <input type="range" min="0" max="360" step="1" v-model="rotation"
                class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </div>
          </div>

          <div
            class="w-full max-w-xs p-3 bg-indigo-500/10 border border-indigo-500/20 text-center text-xs text-slate-300 rounded-xl backdrop-blur-sm">
            💡 Geser & zoom (pinch) foto agar pas di belakang bingkai.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

// ===================== REAKTIF & REFS =====================
const canvasEl = ref(null)
const fileInput = ref(null)
const loading = ref(false)
const imageAdded = ref(false)

let ctx = null
let canvasWidth = 0
let canvasHeight = 0

let userImg = null
let frameImg = null

// Transformasi
const scale = ref(1)      // 0.2 - 4
const rotation = ref(0)   // 0-360
let imgX = 0              // pusat gambar di canvas (x)
let imgY = 0              // pusat gambar di canvas (y)

// Drag state
let activePointerId = null
let lastPointerX = 0
let lastPointerY = 0
let isDragging = false

// Pinch state
let initialPinchDistance = 0
let initialScale = 1
let initialImgX = 0
let initialImgY = 0
let pinchCenterX = 0
let pinchCenterY = 0
let isPinching = false

// Konstanta
const MIN_SCALE = 0.05
const MAX_SCALE = 4
const FRAME_URL = '/bingkai.png'
const HD_SIZE = 1200   // resolusi HD untuk download

// ===================== FUNGSI DASAR CANVAS =====================
async function loadFrame() {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      frameImg = img
      resolve()
    }
    img.onerror = reject
    img.src = FRAME_URL
  })
}

function resizeCanvas() {
  if (!canvasEl.value) return
  const container = canvasEl.value.parentElement
  const size = container.clientWidth
  canvasWidth = size
  canvasHeight = size
  canvasEl.value.width = size
  canvasEl.value.height = size
  drawCanvas()
}

function drawCanvas() {
  if (!ctx || !canvasWidth || !canvasHeight) return
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  if (userImg?.complete && userImg.naturalWidth > 0) {
    ctx.save()
    ctx.translate(imgX, imgY)
    ctx.rotate(rotation.value * Math.PI / 180)
    const halfW = (userImg.width * scale.value) / 2
    const halfH = (userImg.height * scale.value) / 2
    ctx.drawImage(userImg, -halfW, -halfH, userImg.width * scale.value, userImg.height * scale.value)
    ctx.restore()
  }

  if (frameImg?.complete) {
    ctx.drawImage(frameImg, 0, 0, canvasWidth, canvasHeight)
  }
}

function initTransform() {
  if (!userImg || !canvasWidth) return
  const scaleW = canvasWidth / userImg.width
  const scaleH = canvasHeight / userImg.height
  scale.value = Math.max(scaleW, scaleH)
  imgX = canvasWidth / 2
  imgY = canvasHeight / 2
  rotation.value = 0
  drawCanvas()
}

function zoomToCenter(newScale) {
  if (!userImg) return
  newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale))
  if (newScale === scale.value) return
  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  const ratio = newScale / scale.value
  imgX = centerX + (imgX - centerX) * ratio
  imgY = centerY + (imgY - centerY) * ratio
  scale.value = newScale
  drawCanvas()
}

function resetZoom() {
  if (!userImg) return
  const scaleW = canvasWidth / userImg.width
  const scaleH = canvasHeight / userImg.height
  const targetScale = Math.max(scaleW, scaleH)
  zoomToCenter(targetScale)
}

// ===================== WATCHER (responsif slider) =====================
watch(scale, (newScale, oldScale) => {
  if (!userImg) return
  if (newScale !== oldScale) {
    zoomToCenter(newScale)
  }
})

watch(rotation, () => {
  if (!userImg) return
  drawCanvas()
})

// ===================== DRAG (POINTER) =====================
function getCanvasCoords(clientX, clientY) {
  const rect = canvasEl.value.getBoundingClientRect()
  const scaleX = canvasWidth / rect.width
  const scaleY = canvasHeight / rect.height
  let x = (clientX - rect.left) * scaleX
  let y = (clientY - rect.top) * scaleY
  x = Math.min(Math.max(x, 0), canvasWidth)
  y = Math.min(Math.max(y, 0), canvasHeight)
  return { x, y }
}

function onPointerDown(e) {
  e.preventDefault()
  canvasEl.value.setPointerCapture(e.pointerId)
  if (isPinching) return
  activePointerId = e.pointerId
  const { x, y } = getCanvasCoords(e.clientX, e.clientY)
  lastPointerX = x
  lastPointerY = y
  isDragging = true
  canvasEl.value.style.cursor = 'grabbing'
}

function onPointerMove(e) {
  e.preventDefault()
  if (isPinching) return
  if (isDragging && activePointerId === e.pointerId) {
    const { x, y } = getCanvasCoords(e.clientX, e.clientY)
    const dx = x - lastPointerX
    const dy = y - lastPointerY
    if (dx !== 0 || dy !== 0) {
      imgX += dx
      imgY += dy
      lastPointerX = x
      lastPointerY = y
      drawCanvas()
    }
  }
}

function onPointerUp(e) {
  e.preventDefault()
  if (activePointerId === e.pointerId) {
    activePointerId = null
    isDragging = false
    canvasEl.value.style.cursor = 'grab'
  }
}

// ===================== PINCH ZOOM (TOUCH) =====================
function onTouchStartPinch(e) {
  const touches = e.touches
  if (touches.length === 2 && userImg) {
    e.preventDefault()
    initialPinchDistance = Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    )
    initialScale = scale.value
    const centerX = (touches[0].clientX + touches[1].clientX) / 2
    const centerY = (touches[0].clientY + touches[1].clientY) / 2
    const { x, y } = getCanvasCoords(centerX, centerY)
    initialImgX = imgX
    initialImgY = imgY
    pinchCenterX = x
    pinchCenterY = y
    isPinching = true
    if (activePointerId) {
      activePointerId = null
      isDragging = false
    }
  }
}

function onTouchMovePinch(e) {
  const touches = e.touches
  if (touches.length === 2 && isPinching && userImg) {
    e.preventDefault()
    const newDistance = Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    )
    let newScale = initialScale * (newDistance / initialPinchDistance)
    newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale))
    if (newScale === scale.value) return

    const ratio = newScale / scale.value
    const newX = pinchCenterX + (initialImgX - pinchCenterX) * ratio
    const newY = pinchCenterY + (initialImgY - pinchCenterY) * ratio

    scale.value = newScale
    imgX = newX
    imgY = newY
    drawCanvas()
  }
}

function onTouchEndPinch(e) {
  if (e.touches.length < 2) {
    isPinching = false
  }
}

function attachTouchEvents() {
  const canvas = canvasEl.value
  if (!canvas) return
  canvas.addEventListener('touchstart', onTouchStartPinch, { passive: false })
  canvas.addEventListener('touchmove', onTouchMovePinch, { passive: false })
  canvas.addEventListener('touchend', onTouchEndPinch)
  canvas.addEventListener('touchcancel', onTouchEndPinch)
}

function detachTouchEvents() {
  const canvas = canvasEl.value
  if (!canvas) return
  canvas.removeEventListener('touchstart', onTouchStartPinch)
  canvas.removeEventListener('touchmove', onTouchMovePinch)
  canvas.removeEventListener('touchend', onTouchEndPinch)
  canvas.removeEventListener('touchcancel', onTouchEndPinch)
}

// ===================== WHEEL ZOOM (DESKTOP) =====================
function onWheelZoom(e) {
  if (!userImg) return
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.05 : 0.05
  let newScale = scale.value + delta
  newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale))
  if (newScale === scale.value) return
  const { x: mouseX, y: mouseY } = getCanvasCoords(e.clientX, e.clientY)
  const ratio = newScale / scale.value
  const newX = mouseX + (imgX - mouseX) * ratio
  const newY = mouseY + (imgY - mouseY) * ratio
  scale.value = newScale
  imgX = newX
  imgY = newY
  drawCanvas()
}

// ===================== FILE HANDLING =====================
function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  loading.value = true
  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image()
    img.onload = () => {
      userImg = img
      imageAdded.value = true
      loading.value = false
      initTransform()
    }
    img.onerror = () => {
      loading.value = false
      alert('Gagal memuat gambar. Coba file lain.')
    }
    img.src = event.target.result
  }
  reader.onerror = () => {
    loading.value = false
    alert('Gagal membaca file.')
  }
  reader.readAsDataURL(file)
}

function triggerFileInput() {
  fileInput.value.click()
}

// ===================== DOWNLOAD HD =====================
function downloadImage() {
  if (!userImg) {
    alert('Tidak ada gambar untuk diunduh.')
    return
  }
  if (!frameImg || !frameImg.complete) {
    alert('Bingkai belum siap, coba lagi nanti.')
    return
  }

  const hdCanvas = document.createElement('canvas')
  hdCanvas.width = HD_SIZE
  hdCanvas.height = HD_SIZE
  const hdCtx = hdCanvas.getContext('2d')
  if (!hdCtx) return

  const scaleFactor = HD_SIZE / canvasWidth

  // Gambar user dengan transformasi yang sama
  if (userImg.complete) {
    hdCtx.save()
    const hdImgX = imgX * scaleFactor
    const hdImgY = imgY * scaleFactor
    hdCtx.translate(hdImgX, hdImgY)
    hdCtx.rotate(rotation.value * Math.PI / 180)
    const hdImgW = userImg.width * scale.value * scaleFactor
    const hdImgH = userImg.height * scale.value * scaleFactor
    hdCtx.drawImage(userImg, -hdImgW / 2, -hdImgH / 2, hdImgW, hdImgH)
    hdCtx.restore()
  }

  // Gambar frame (skala penuh HD)
  if (frameImg.complete) {
    hdCtx.drawImage(frameImg, 0, 0, HD_SIZE, HD_SIZE)
  }

  const link = document.createElement('a')
  const uniqueId = Math.random().toString(36).substring(2, 7).toUpperCase()
  link.download = `twibbon-onkp-74-${uniqueId}.png`
  link.href = hdCanvas.toDataURL('image/png')
  link.click()
}

// ===================== RESET =====================
function resetCanvas() {
  userImg = null
  imageAdded.value = false
  scale.value = 1
  imgX = canvasWidth / 2
  imgY = canvasHeight / 2
  rotation.value = 0
  drawCanvas()
  if (fileInput.value) fileInput.value.value = ''
}

// ===================== RESIZE OBSERVER & LIFECYCLE =====================
let resizeObserver = null

onMounted(async () => {
  if (canvasEl.value) {
    ctx = canvasEl.value.getContext('2d')
    try {
      await loadFrame()
      resizeCanvas()
      attachTouchEvents()
      const container = canvasEl.value.parentElement
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas()
        if (userImg) {
          drawCanvas()
        } else {
          drawCanvas()
        }
      })
      resizeObserver.observe(container)
    } catch (err) {
      console.error(err)
      if (ctx) {
        ctx.fillStyle = 'red'
        ctx.font = '14px sans-serif'
        ctx.fillText('Gagal memuat bingkai', 20, 50)
      }
    }
  }
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  detachTouchEvents()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.touch-none {
  touch-action: none;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: #334155;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: none;
}
</style>