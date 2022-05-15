## `loop-fns`

A lightweight solution for looping with great performance and control.

## Get started

Install

```bash
yarn add loop-fns
# or
npm install --save loop-fns
```

Use

```typescript
import { loopFrames } from 'loop-fns'

const loop = loopFrames((currentFrame, delta, loop) => {
  // your graphics update logic...

  if (currentFrame === 10) {
    // the same handlers that are returned by loopFrames are also available here
    loop.stop()
  }
}, 30) // limit to 30fps

loop.start()
```

<!-- [Examples](https://github.com/skulptur/loop-fns/tree/master/example) -->
