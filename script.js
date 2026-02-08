"use strict";

const boardImage = document.querySelector('img[alt="Chess Board"]'),
  gameContainer = document.querySelector("div#game-container"),
  container = document.querySelector(".container");

const BASE_CHESS_BOARD_RATIO = 784 / 2, // 392 pixel
  CHESS_BOARD_GRID = 8, // COLUMN times (x) ROW
  CHESS_BOARD_IMAGE_BORDER = 2,
  TOTAL_PIECES = CHESS_BOARD_GRID * (CHESS_BOARD_GRID / 2),
  TOTAL_PIECES_PER_SIDES = TOTAL_PIECES / 2,
  PIECE_NAMES = ["bishop", "knight", "king", "pawn", "queen", "rook"],
  PIECE_ORDER = [
    // Total 16 piece
    PIECE_NAMES[5],
    PIECE_NAMES[1],
    PIECE_NAMES[0],
    PIECE_NAMES[2],
    PIECE_NAMES[4],
    PIECE_NAMES[0],
    PIECE_NAMES[1],
    PIECE_NAMES[5],
    PIECE_NAMES[3],
    PIECE_NAMES[3],
    PIECE_NAMES[3],
    PIECE_NAMES[3],
    PIECE_NAMES[3],
    PIECE_NAMES[3],
    PIECE_NAMES[3],
    PIECE_NAMES[3],
  ],
  TILE_RATIO = BASE_CHESS_BOARD_RATIO / CHESS_BOARD_GRID,
  SIDES = ["white", "black"];
let BOARD_TILES = null;

function generateBoardTilesCoordinates(baseChessBoardRatio, chessBoardGrid) {
  const coordinates = [],
    tileRatio = baseChessBoardRatio / chessBoardGrid;

  for (let row = 1; row <= chessBoardGrid; row++) {
    for (let col = 1; col <= chessBoardGrid; col++) {
      coordinates.push({
        name: `${chessBoardGrid + 1 - row}${String.fromCharCode(96 + col)}`, // lower case alphabet from UTF-8 unit code sequence
        top: tileRatio * row - tileRatio,
        left: tileRatio * col - tileRatio,
      });
    }
  }

  return coordinates;
}

function generatePieceElement(forSide, tileCoordinate, pieceName) {
  const tileElement = document.createElement("img");
  tileElement.className = `side-${forSide} piece ${pieceName}`;
  tileElement.alt = `Piece ${pieceName}`;
  tileElement.src = `assets/${forSide}-${pieceName}.png`;
  // Adding style for just the top and left property value
  tileElement.style.top = tileCoordinate.top + "px";
  tileElement.style.left = tileCoordinate.left + "px";
  tileElement.style.width = TILE_RATIO + "px";
  tileElement.style.height = TILE_RATIO + "px";

  return tileElement;
}

function generateStartPositionForPieces(coordinates) {
  let isAnotherSide = false;

  SIDES.forEach((sideValue, sideIndex) => {
    isAnotherSide = sideIndex > 0;

    for (let f = 0; f < TOTAL_PIECES_PER_SIDES; f++) {
      gameContainer.appendChild(
        generatePieceElement(
          sideValue,
          coordinates[
            isAnotherSide
              ? CHESS_BOARD_GRID * CHESS_BOARD_GRID - TOTAL_PIECES_PER_SIDES + f
              : f
          ],
          PIECE_ORDER[
            isAnotherSide
              ? f > CHESS_BOARD_GRID - 1
                ? f - CHESS_BOARD_GRID
                : TOTAL_PIECES_PER_SIDES - (f + 1)
              : f
          ],
        ),
      );
    }
  });
}

function generateExternalTileLabels(baseChessBoardRatio, chessBoardGrid) {
  const tileNameSPANElement = (tileName) =>
      `<span class="tile-name">${tileName}</span>`,
    xAxis = document.querySelector(".axis-x"),
    yAxis = document.querySelector(".axis-y");

  xAxis.style.width = baseChessBoardRatio + "px";
  yAxis.style.height = baseChessBoardRatio + "px";

  for (let i = 0; i < chessBoardGrid; i++) {
    xAxis.insertAdjacentHTML(
      "beforeend",
      tileNameSPANElement(String.fromCharCode(97 + i)),
    );
    yAxis.insertAdjacentHTML(
      "beforeend",
      tileNameSPANElement(chessBoardGrid - i),
    );
  }
}

// Getting every coordinates of tile
BOARD_TILES = generateBoardTilesCoordinates(
  BASE_CHESS_BOARD_RATIO,
  CHESS_BOARD_GRID,
);
generateExternalTileLabels(BASE_CHESS_BOARD_RATIO, CHESS_BOARD_GRID);
generateStartPositionForPieces(BOARD_TILES);

console.log(BOARD_TILES);

// Exporting the chess constanta
export {
  BASE_CHESS_BOARD_RATIO,
  BOARD_TILES,
  boardImage,
  CHESS_BOARD_GRID,
  CHESS_BOARD_IMAGE_BORDER,
  gameContainer,
  PIECE_NAMES,
  PIECE_ORDER,
  TOTAL_PIECES,
  TOTAL_PIECES_PER_SIDES,
};
