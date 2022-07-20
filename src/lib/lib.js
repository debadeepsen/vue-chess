import { files } from '@/lib/constants'

export const initBoard = (board, initConfig) => {
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
      if (boxPiece && boxPiece.toLowerCase() === boxPiece) boxPiece = `_${boxPiece.toUpperCase()}`
    //   console.log({ initConfig, boxPiece })
      rank.boxes.push({
        file: files[i],
        key: boxKey,
        color: (i + rank.row) % 2 === 0 ? 'dark' : 'light',
        piece: boxPiece
      })
    }
  })
}
