// composables/useTwibbonCanvas.js atau .ts
import { ref } from 'vue'

export const useTwibbonCanvas = () => {
  const canvasEl = ref(null)
  const loading = ref(false)
  const imageAdded = ref(false)
  const imgScale = ref(1)
  const rotationDeg = ref(0)

  let ctx = null
  let userImg = null
  let frameImg = null
  let imgX = 0
  let imgY = 0

  const MIN_SCALE = 0.2
  const MAX_SCALE = 4
  const FRAME_URL = '/bingkai.png'

  const loadFrame = async () => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => { frameImg = img; resolve(img) }
      img.onerror = reject
      img.src = FRAME_URL
    })
  }

  const drawCanvas = () => {
    if (!ctx || !canvasEl.value) return
    const cvs = canvasEl.value
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    if (userImg?.complete) {
      ctx.save()
      ctx.translate(imgX, imgY)
      ctx.rotate((rotationDeg.value * Math.PI) / 180)
      const w = userImg.width * imgScale.value
      const h = userImg.height * imgScale.value
      ctx.drawImage(userImg, -w / 2, -h / 2, w, h)
      ctx.restore()
    }

    if (frameImg?.complete) {
      ctx.drawImage(frameImg, 0, 0, cvs.width, cvs.height)
    }
  }

  const initTransform = () => {
    if (!userImg || !canvasEl.value) return
    const scale = Math.max(canvasEl.value.width / userImg.width, canvasEl.value.height / userImg.height)
    imgScale.value = scale
    imgX = canvasEl.value.width / 2
    imgY = canvasEl.value.height / 2
    rotationDeg.value = 0
    drawCanvas()
  }

  // Hapus ": number" jika ini file .js
  const moveImage = (dx, dy) => {
    imgX += dx
    imgY += dy
    drawCanvas()
  }

  const setScale = (newScale, centerX, centerY) => {
    const oldScale = imgScale.value
    const validatedScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale))
    
    if (centerX !== undefined && centerY !== undefined) {
      const ratio = validatedScale / oldScale
      imgX = centerX + (imgX - centerX) * ratio
      imgY = centerY + (imgY - centerY) * ratio
    }
    
    imgScale.value = validatedScale
    drawCanvas()
  }

  return {
    canvasEl, loading, imageAdded, imgScale, rotationDeg,
    MIN_SCALE, MAX_SCALE,
    loadFrame, drawCanvas, initTransform, moveImage, setScale,
    setUserImg: (img) => { userImg = img },
    setCtx: (c) => { ctx = c }
  }
}