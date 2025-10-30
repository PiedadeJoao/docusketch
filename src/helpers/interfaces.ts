export interface Wall {
  id: string
}

export interface Corner {
  id: string
  x: number
  y: number
  wallStarts: Wall[]
  wallEnds: Wall[]
}

export interface Room {
  walls: Wall[]
  corners: Corner[]
}
