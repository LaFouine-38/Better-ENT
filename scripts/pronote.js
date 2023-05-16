window.onload = () => {


    setTimeout(() => {                                                      //
        let icon = document.querySelector("div.ibe_image_etab > img")       //  Changer le logo de Pronote
        icon.src = "https://zupimages.net/up/23/17/arzr.png"

        const noteBouton = document.getElementById('GInterface.Instances[0].Instances[1]_Wrapper').children.item(1)
        setInterval(() => {
            if (noteBouton.classList.contains('item-selected')) {
                var pattern = /^GInterface\.Instances\[2\]\.Instances\[1\]_1_/;
                let matièresName = []
                let notes = []
                var elements = document.querySelectorAll('[id^="GInterface.Instances[2].Instances[1]_1_"]');
                var filteredElements = Array.from(elements).filter(function (element) {
                    return pattern.test(element.id);
                });
                elements.forEach(e => {
                    if (e.nodeName == "ARTICLE") {
                        if (e.children.item(0).children.item(0).children.item(0).children.item(1).innerHTML.split(' ')[0] == e.children.item(0).children.item(0).children.item(0).children.item(1).innerHTML.split(' ')[0].toUpperCase()) {
                            matièresName.push(e.children.item(0).children.item(0).children.item(0).children.item(1).innerHTML)
                            notes.push(e.children.item(0).children.item(0).children.item(0).children.item(0).innerHTML)
                        }
                    }
                })

                let moyenneG = 0
                var sum = 0;
                for (var i = 0; i < notes.length; i++) {
                    var number = parseFloat(notes[i].replace(',', '.'));
                    sum += number;
                }

                moyenneG = sum / notes.length;

                let allLine = document.querySelectorAll('.AvecMain')
                let lastLine = allLine[allLine.length - 1]

                // merci chat gpt de l'avoir pondu ce code car j'avais vrmt la flm ...
                var divElement = document.createElement("div");
                if(document.querySelector('.mg') != null) return
                const temp = () => {
                    divElement.id = "GInterface.Instances[2].Instances[1]_1_46";
                    divElement.setAttribute("role", "row");
                    divElement.setAttribute("aria-rowindex", "10");
                    divElement.className = "liste_celluleGrid liste_celluleGrid_10 AvecMain mg";
                    divElement.style.gridColumn = "2";
                    divElement.style.minHeight = "20px";
                    divElement.style.padding = "2px 3px";
                    divElement.style.marginTop = "20px"

                    // Création de l'élément <article> à l'intérieur du <div>
                    var articleElement = document.createElement("article");
                    articleElement.setAttribute("role", "gridcell");
                    articleElement.setAttribute("aria-colindex", "2");
                    articleElement.setAttribute("aria-selected", "true");
                    articleElement.id = "GInterface.Instances[2].Instances[1]_1_45_div";
                    articleElement.className = "liste_contenu_cellule";
                    articleElement.tabIndex = "-1";

                    // Création de l'élément <div> à l'intérieur de l'<article>
                    var divContenuElement = document.createElement("div");
                    divContenuElement.className = "liste_contenu_cellule_contenu";
                    divContenuElement.style.width = "371px";
                    divContenuElement.style.minHeight = "16px";

                    // Création de l'élément <div> à l'intérieur du <divContenuElement>
                    var divLigneElement = document.createElement("div");
                    divLigneElement.style.width = "371px";
                    divLigneElement.style.overflow = "hidden";
                    divLigneElement.className = "liste_contenu_ligne";

                    // Création de l'élément <div> à l'intérieur du <divLigneElement>
                    var divGrasElement = document.createElement("div");
                    divGrasElement.className = "Gras Espace";
                    divGrasElement.setAttribute("aria-label", "MOYENNE GÉNÉRALE");

                    // Création de l'élément <div> "18,91" à l'intérieur du <divGrasElement>
                    var divNoteElement = document.createElement("div");
                    divNoteElement.style.float = "right";
                    divNoteElement.textContent = moyenneG.toString();

                    // Création de l'élément <div> "MOYENNE GÉNÉRALE" à l'intérieur du <divGrasElement>
                    var divTitreElement = document.createElement("div");
                    divTitreElement.textContent = "MOYENNE GÉNÉRALE";

                    // Ajout des éléments enfants dans la hiérarchie
                    divGrasElement.appendChild(divNoteElement);
                    divGrasElement.appendChild(divTitreElement);
                    divLigneElement.appendChild(divGrasElement);
                    divContenuElement.appendChild(divLigneElement);
                    articleElement.appendChild(divContenuElement);
                    divElement.appendChild(articleElement)
                }
                temp()

                lastLine.insertAdjacentElement("afterend", divElement)

                allLine = document.querySelectorAll('.AvecMain')
                lastLine = allLine[allLine.length - 1]
                if(lastLine != null) lastLine.insertAdjacentElement("afterend", divElement)
            }
        }, 500)

    }, 1000)

}