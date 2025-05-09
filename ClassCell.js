class ClassCell {

    /**
  * Constructeur de la classe.
  * @param {Object} table - Référence au tableau (SVG) parent.
  * @param {number} dataPoints - Nombre de points de données (colonnes).
  * @param {string} node - Contenu initial de la cellule.
  * @param {number} numberX - Position X de la cellule (colonne).
  * @param {number} numberY - Position Y de la cellule (rangée).
  * @param {Array} sum - Tableau utilisé pour les calculs (somme, moyenne).
  */

    constructor(table, dataPoints, node, numberX, numberY, sum) {
        this.table = table;
        this.dataPoints = dataPoints;
        this.content = node.toString(); // Convertit le contenu en chaîne.
        this.numberX = numberX;
        this.numberY = numberY;
        this.sum = sum;

        this.checkContent(); // Vérifie et ajuste le contenu

        // Dimensions et positions de la cellule et du texte

        this.cellWidth = this.singleCellWidth();
        this.cellHeight = this.singleCellHeight();

        this.textX = this.contentPositionX();
        this.textY = this.contentPositionY();

        this.positionX = this.cellPositionX();
        this.positionY = this.cellPositionY();

        // Crée le rectangle et le texte dans le SVG
        this.cell = _addSVG(table.svg, 'rect', { class: 'rect' });
        this.cellContent = _addText(table.svg, this.content, false);
    }
    // Calcule la largeur de la cellule
    singleCellWidth() {
        let width = (1000 / this.dataPoints) - 2;
        return width;
    } //cellWidth()

    singleCellHeight() {
        let height = (400 / 4) - 2;
        return height;
    } //singleCellHeight()

    // Position X de la cellule
    cellPositionX() {
        let cellX = (this.singleCellWidth() * this.numberX)
        return cellX;
    } //cellPositionX()

    // Position y de la cellule
    cellPositionY() {
        let cellY = 200 + (this.singleCellHeight() * this.numberY)
        return cellY;
    } //cellPositionY()

    // Position x du text (centrer)
    contentPositionX() {
        let contentX = this.cellPositionX() + (this.singleCellWidth() / 2);
        return contentX;
    }
    // Position y de la cellule
    contentPositionY() {
        let contentY = this.cellPositionY() + (this.singleCellHeight() / 2);
        //console.log(contentY);
        return contentY;

    }
    // Vérifie et modifie le contenu si nécessaire
    checkContent() {
        if (this.content == '' && this.numberY == 5) {
            this.content = this.calcSum();
           // console.log(this.content)
            this.content = this.content.toString();
            return this.content;
        }
        else if (this.content == '' && this.numberY == 6) {
            this.content = this.calcAverage();
            this.content = this.content.toString();
            return this.content;
        }
        else {
            return this.content;
        }
    }

    calcSum() {
        let summe = 0;
        if (this.numberX >= 2) {
            for (let i = 1; i < 4; i++) {
                summe += parseFloat(this.sum[i]);
            }
            return summe;
        }
    }

    calcAverage() {
        let average = this.calcSum() / 3;
        return Math.floor(average);
    }

// Dessine la cellule et le texte
    draw() {
        _setAttr(this.cell, {
            width: `${this.singleCellWidth()}`,

            height: `${this.singleCellHeight()}`, x: `${this.cellPositionX()}`,
            y: `${this.cellPositionY()}`
        });

        _positionText(this.cellContent, { x: `${this.textX}`, y: `${this.textY}` });
    }
}
