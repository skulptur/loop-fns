const oneSecond = 1000
const noop = () => {}

export type LoopFramesHandlers = {
  start: () => void
  stop: () => void
  setFps: (fps: number) => void
}

// TODO:
// implement pause
export const loopFrames = (
  onFrame: (currentFrame: number, delta: number, handlers: LoopFramesHandlers) => void,
  fps: number = 60
) => {
  let fpsInterval = oneSecond / fps
  let currentFrame = 0
  let startTime = NaN
  let lastTime = NaN
  let id = NaN

  const handlers: LoopFramesHandlers = {
    start: noop,
    stop: noop,
    setFps: noop,
  }

  const step = (now: number) => {
    const delta = now - lastTime

    if (delta > fpsInterval) {
      const elapsedTime = now - startTime
      // adjust for fpsInterval not being multiple of 16.67
      lastTime = now - (elapsedTime % fpsInterval)
      currentFrame++
      onFrame(currentFrame, delta, handlers)
    }
    id = requestAnimationFrame(step)
  }

  handlers.start = () => {
    if (!isNaN(id)) return
    startTime = performance.now()
    lastTime = startTime
    requestAnimationFrame(() => onFrame(currentFrame, 0, handlers))
    id = requestAnimationFrame(step)
  }

  handlers.stop = () => {
    cancelAnimationFrame(id)
    id = NaN
    currentFrame = 0
  }

  handlers.setFps = (fps: number) => {
    fpsInterval = oneSecond / fps
  }

  return handlers
}
