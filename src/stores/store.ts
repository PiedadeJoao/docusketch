import { defineStore } from "pinia";
import type { Room } from "@/helpers/interfaces";

type State = {
  triangle: Room
  tShape: Room
  simple: Room
  selectedRoom: Room | null
}

export const useStore = defineStore("store", {
  state: (): State => ({
    selectedRoom: null,
    triangle: {
      walls: [],
      corners: []
    },
    tShape: {
      walls: [],
      corners: []
    },
    simple: {
      walls: [],
      corners: []
    }
  }),
  actions: {
    async fetchData(){
      try {
        const triangle = await fetch("/triangle.json")
        const tShape = await fetch("/t_shape.json")
        const simple = await fetch("/simple.json")

        this.triangle = (await triangle.json()) as Room
        this.tShape = (await tShape.json()) as Room
        this.simple = (await simple.json()) as Room
      } catch (error) {
        console.error(error)
      }
    },

    selectRandomRoom(){
      const random = Math.floor(Math.random() * 3)
      switch (random) {
        case 0:
          return this.selectedRoom = this.triangle
        case 1:
          return this.selectedRoom = this.tShape
        default:
          return this.selectedRoom = this.simple
      }
    }
  },
  getters: {
    getSelectedRoom: (state) => state.selectedRoom
  },
});
