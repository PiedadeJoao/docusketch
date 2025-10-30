<script setup lang="ts">
import type { Room } from '@/helpers/interfaces';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{ room: Room | null }>();
const canvas = ref<HTMLCanvasElement | null>(null);
const selectedWallIndex = ref(0);

function drawDimensions(ctx: CanvasRenderingContext2D, room: Room, scale: number, minX: number, minY: number) {
  const walls = room.walls;
  if (!walls.length) return;

  const wall = walls[selectedWallIndex.value];

  const startCorner = room.corners.find(c => c.wallStarts.some(w => w.id === wall!.id));
  const endCorner = room.corners.find(c => c.wallEnds.some(w => w.id === wall!.id));
  if (!startCorner || !endCorner) return;

  const x1 = (startCorner.x - minX) * scale;
  const y1 = (startCorner.y - minY) * scale;
  const x2 = (endCorner.x - minX) * scale;
  const y2 = (endCorner.y - minY) * scale;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.stroke();

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / length;
  const ny = dx / length;

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const extend = 100;
  const startX = midX - nx * extend;
  const startY = midY - ny * extend;
  const endX = midX + nx * extend;
  const endY = midY + ny * extend;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.stroke();
}


function drawFigure(ctx: CanvasRenderingContext2D, minX: number, minY: number, scale: number) {
  if(!props.room) return;

  ctx.beginPath();
  for (let i = 0; i < props.room.corners.length; i++) {
    const corner = props.room.corners[i];
    const x = (corner!.x - minX) * scale;
    const y = (corner!.y - minY) * scale;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#ddd';
  ctx.fill();
}

function drawRoom() {
  if (!canvas.value || !props.room) return;
  const c = canvas.value as HTMLCanvasElement;
  const ctx = c.getContext('2d');
  if (!ctx) return;

  c.width = 400;
  c.height = 400;

  const xs = props.room.corners.map(c => c.x);
  const ys = props.room.corners.map(c => c.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  const scaleX = c.width / (maxX - minX);
  const scaleY = c.height / (maxY - minY);
  const scale = Math.min(scaleX, scaleY);

  drawFigure(ctx, minX, minY, scale);
  drawDimensions(ctx, props.room, scale, minX, minY);
}

function changeDimensions() {
  if (!props.room) return;
  selectedWallIndex.value === props.room.walls.length - 1 ? selectedWallIndex.value = 0 : selectedWallIndex.value++;
  drawRoom();
}

watch(() => props.room?.walls, drawRoom, { deep: true });
onMounted(drawRoom);
</script>

<template>
  <slot name="title"></slot>
  <div class="room-container">
    <canvas ref="canvas" width="400" height="400"></canvas>
  </div>
  <button @click="changeDimensions">Change length/width</button>
</template>

<style>
.room-container {
  margin-top: 20px;
}
</style>
