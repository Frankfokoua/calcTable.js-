class ClassTable {
    constructor() {

        //Constructeur : Initialise le SVG et la liste des cellules.
        for (let s of document.getElementsByTagName('svg'))
            document.body.removeChild(s);

        // Crée un nouveau SVG
        this.svg = _addSVG(document.body, 'svg', { width: 1400, height: 1200 });
        // Liste des cellules
        this.singleCell = [];
    } //constructor()


    /**
    * Ajoute une cellule au tableau.
    * @param {number} dataPoints - Nombre total de points de données (colonnes).
    * @param {string} node - Contenu de la cellule.
    * @param {number} numberX - Position X de la cellule (colonne).
    * @param {number} numberY - Position Y de la cellule (rangée).
    * @param {Array} sum - Tableau contenant des données utilisées pour les calculs.
    */

    addCell(dataPoints, node, numberX, numberY, sum) {
        this.singleCell.push(new ClassCell(this, dataPoints, node, numberX, numberY, sum));
    }


    /**
    * Affiche toutes les cellules dans le SVG.
    */

    show() {
        for (let s of this.singleCell) {
            s.draw();
        }
    } //show()


    /**
    * @param {string} fileAsText - Contenu du fichier texte à convertir en tableau.
    */

    build(fileAsText) {
        let rows = fileAsText.split('\n');
        //console.log(rows);
        let numberX = 1;
        let numberY = 1;
        let sum;
        dataPoints = rows.length;
        for (let j = 0; j < rows.length; j++) {  
            if (!rows[j].trim) continue;
            let node = rows[j].split(";")
            //console.log(node);
            sum = node;

            // Ajoute chaque cellule
            for (let i = 0; i < node.length; i++) {

                this.addCell(dataPoints, node[i], numberX, numberY, sum)

                console.log(node[i]);
                numberY += 1;
            }
            // Réinitialiser et passe à la colonne suivante
            numberY = 1;
            numberX += 1;
        }
    } //build(fileAsText)

} //class ClassTable