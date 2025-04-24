class Level {
  constructor(levelNumber) {
    this.blocks = [];
    this.createLevel(levelNumber);
  }

  createLevel(n) {
    this.blocks = []; 
    if (n === 1) {
      let rows = 4;
      let cols = 5;
      let w = 60;
      let h = 20;
      let padding = 10;
      let offsetTop = 50;
      let offsetLeft = (width - cols * (w + padding)) / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = offsetLeft + col * (w + padding);
          let y = offsetTop + row * (h + padding);
          this.blocks.push(new Block(x, y, w, h));
        }
      }
    } else if (n === 2) {
      // Nivel 2: Más bloques, uno que se rompa con 3 golpes
      let rows = 5;
      let cols = 5;
      let w = 60;
      let h = 20;
      let padding = 10;
      let offsetTop = 50;
      let offsetLeft = (width - cols * (w + padding)) / 2;

      // Generar un índice aleatorio para el bloque con 3 golpes
      let randomRow = floor(random(rows));
      let randomCol = floor(random(cols));

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = offsetLeft + col * (w + padding);
          let y = offsetTop + row * (h + padding);
          let block = new Block(x, y, w, h);

          // Asignar 3 golpes a un bloque aleatorio
          if (row === randomRow && col === randomCol) {
            block.hitsCount = 3;
            block.color = color(255, 0, 0); 
          }

          this.blocks.push(block);
        }
      }
    }else if (n === 3) {
        let rows = 6;
        let cols = 5;
        let w = 60;
        let h = 20;
        let padding = 10;
        let offsetTop = 50;
        let offsetLeft = (width - cols * (w + padding)) / 2;
      
        // Elegimos dos posiciones distintas para los bloques de 3 hits
        let hitBlocks = [];
        while (hitBlocks.length < 2) {
          let r = floor(random(rows));
          let c = floor(random(cols));
          let exists = hitBlocks.some(b => b.row === r && b.col === c);
          if (!exists) hitBlocks.push({ row: r, col: c });
        }
      
        // Posición para el bloque irrompible, asegurando que no se repita con los de 3 hits
        let unbreakablePos;
        do {
          unbreakablePos = {
            row: floor(random(rows)),
            col: floor(random(cols)),
          };
        } while (
          hitBlocks.some(b => b.row === unbreakablePos.row && b.col === unbreakablePos.col)
        );
      
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            let x = offsetLeft + col * (w + padding);
            let y = offsetTop + row * (h + padding);
            let block = new Block(x, y, w, h);
      
            // Bloques de 3 golpes
            if (hitBlocks.some(b => b.row === row && b.col === col)) {
              block.hitsCount = 3;
              block.color = color(255, 0, 0);
            }
      
            // Bloque irrompible
            if (row === unbreakablePos.row && col === unbreakablePos.col) {
              block.indestructible = true;
              block.color = color(120, 120, 120);
            }
      
            this.blocks.push(block);
          }
        }
      }
  }

  draw() {
    for (let block of this.blocks) {
      block.draw();
    }
  }
}