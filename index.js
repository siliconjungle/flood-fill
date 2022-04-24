const CANVAS_WIDTH = 32
const CANVAS_HEIGHT = 32

const TILES = {
  EMPTY: 0,
  STONE: 1,
  GRASS: 1,
  WATER: 2,
}

const canvas = new Array(CANVAS_WIDTH * CANVAS_HEIGHT).fill(TILES.EMPTY)

const getIndexFromPosition = (position, width) =>
  position.x + width * position.y

const floodFill = (canvas, position, newTile) => {
  const index = getIndexFromPosition(position, CANVAS_WIDTH)
  const sourceTile = canvas[index]
  if (sourceTile === newTile) {
    return
  }
  const nextNodes = []
  let currentPosition
  nextNodes.push(position)

  const fillTile = (nextPosition) => {
    const currentIndex = getIndexFromPosition(nextPosition, CANVAS_WIDTH)
    if (canvas[currentIndex] === sourceTile) {
      canvas[currentIndex] = newTile
      nextNodes.push(nextPosition)
    }
  }

  do {
    currentPosition = nextNodes.shift()
    if (currentPosition.x > 0) {
      fillTile({ x: currentPosition.x - 1, y: currentPosition.y })
    }
    if (currentPosition.x < CANVAS_WIDTH - 1) {
      fillTile({ x: currentPosition.x + 1, y: currentPosition.y })
    }
    if (currentPosition.y > 0) {
      fillTile({ x: currentPosition.x, y: currentPosition.y - 1 })
    }
    if (currentPosition.y < CANVAS_HEIGHT - 1) {
      fillTile({ x: currentPosition.x, y: currentPosition.y + 1 })
    }
  } while (nextNodes.length > 0)
}

floodFill(canvas, { x: 0, y: 0 }, TILES.STONE)
