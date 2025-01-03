const ALIGN_CENTER = `
    <svg t="1719248469954" class="icon-symbol" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4377">
        <path d="M96 128h832v96H96zM96 576h832v96H96zM224 352h576v96H224zM224 800h576v96H224z" p-id="4378" fill="currentColor"></path>
    </svg>`;
const ALIGN_LEFT = `
    <svg width="24" height="24" t="1719248152373" class="icon-symbol" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4230">
        <path d="M96 128h832v96H96zM96 576h832v96H96zM96 352h576v96H96zM96 800h576v96H96z" p-id="4231"></path>
    </svg>`;
const ALIGN_RIGHT = `
    <svg t="1719248528798" class="icon-symbol" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4524">
        <path d="M96 128h832v96H96zM96 576h832v96H96zM352 352h576v96H352zM352 800h576v96H352z" p-id="4525"></path>
    </svg>`;

import type { BytemdPlugin } from "bytemd";

/**
 * 对齐方式插件
 */
export default function alignPlugin(): BytemdPlugin {
  return {
    actions: [
      {
        title: "",
        icon: ALIGN_CENTER,
        handler: {
          type: "dropdown",
          actions: [
            {
              title: "左对齐",
              icon: ALIGN_LEFT,
              handler: {
                type: "action",
                click: (ctx) => {
                  ctx.wrapText('<p align="left">', "</p>");
                  ctx.editor.focus();
                },
              },
            },
            {
              title: "居中",
              icon: ALIGN_CENTER,
              handler: {
                type: "action",
                click: (ctx) => {
                  console.log("lfsz", ctx);

                  ctx.wrapText('<p align="center">', "</p>");
                  ctx.editor.focus();
                },
              },
            },
            {
              title: "右对齐",
              icon: ALIGN_RIGHT,
              handler: {
                type: "action",
                click: (ctx) => {
                  ctx.wrapText('<p align="right">', "</p>");
                  ctx.editor.focus();
                },
              },
            },
          ],
        },
      },
    ],
  };
}
