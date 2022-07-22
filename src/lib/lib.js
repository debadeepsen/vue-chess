import { files } from '@/lib/constants'

export const initBoard = (board, initConfig) => {
  console.log({ initConfig })
  try {
    board.value = []

    for (let i = 0; i < 8; i++) {
      board.value.push({
        row: i + 1,
        boxes: []
      })
    }

    board.value.forEach((rank) => {
      for (let i = 0; i < 8; i++) {
        const boxKey = files[i] + rank.row
        let boxPiece = initConfig.pieces[boxKey]
        if (boxPiece && boxPiece.toLowerCase() === boxPiece)
          boxPiece = `_${boxPiece.toUpperCase()}`
        //   console.log({ initConfig, boxPiece })
        rank.boxes.push({
          file: files[i],
          key: boxKey,
          color: (i + rank.row) % 2 === 0 ? 'dark' : 'light',
          piece: boxPiece
        })
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export const hasPiece = (gameJSON, boxKey) =>
  Object.keys(gameJSON.pieces).includes(boxKey)

export const getFormattedMove = (historyMove) => {
  console.log({ historyMove })
  const pieceMoved = historyMove.configuration.pieces[historyMove.from]
  const prefix =
    pieceMoved.toLowerCase() === 'p' ? '' : pieceMoved.toUpperCase()
  const to = historyMove.to.toLowerCase()
  const suffix = historyMove.checkMate ? '#' : historyMove.check ? '+' : ''

  return prefix + to + suffix
}

export const getLastMove = (history, gameJSON) => {
  const lastMove = history[history.length - 1]
  lastMove.check = gameJSON.check
  lastMove.checkMate = gameJSON.checkMate

  return lastMove
}

