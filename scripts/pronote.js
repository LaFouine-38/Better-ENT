window.onload = () => {
    setTimeout(() => {
        let icon = document.querySelector("div.ibe_image_etab > img")       //  Changer le logo de Pronote
        icon.src = "https://zupimages.net/up/23/36/vulm.png"                //
        icon.classList.add("margin-left10")

        const noteBouton = document.getElementById('GInterface.Instances[0].Instances[1]_Wrapper').children.item(1)
        setInterval(() => {
            if (noteBouton.classList.contains('item-selected')) {

                const divRegroupement = document.getElementById('GInterface.Instances[2].Instances[1]_Contenu_1')
                let max = new Number(), lastMax = 0
                const numbers = new Array()
                Array.from(divRegroupement.children).forEach(t => {
                    if(t.id.startsWith("GInterface.Instances[2].Instances[1]_")) {
                        numbers.push(t.id.split('_')[2])
                    }
                })
                max = Math.max(...numbers)
                if(Math.max(max, lastMax) != max) {
                    lastMax = max
                }                

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

                var divElement = document.createElement("div");
                if (document.querySelector('.mg') != null) return
                const temp = () => {
                    divElement.id = "GInterface.Instances[2].Instances[1]_1_";
                    divElement.setAttribute("role", "row");
                    divElement.setAttribute("aria-rowindex", "10");
                    divElement.className = "AvecMain mg";
                    divElement.style.gridColumn = "2";
                    divElement.style.minHeight = "20px";
                    divElement.style.padding = "2px 3px";                    

                    var articleElement = document.createElement("article");
                    articleElement.setAttribute("role", "gridcell");
                    articleElement.setAttribute("aria-colindex", "2");
                    articleElement.setAttribute("aria-selected", "true");
                    articleElement.id = "GInterface.Instances[2].Instances[1]_1_45_div";
                    articleElement.className = "liste_contenu_cellule";
                    articleElement.tabIndex = "-1";

                    var divContenuElement = document.createElement("div");
                    divContenuElement.className = "liste_contenu_cellule_contenu";
                    divContenuElement.style.width = "371px";
                    divContenuElement.style.minHeight = "16px";

                    var divLigneElement = document.createElement("div");
                    divLigneElement.style.width = "371px";
                    divLigneElement.style.overflow = "hidden";
                    divLigneElement.className = "liste_contenu_ligne";

                    var divGrasElement = document.createElement("div");
                    divGrasElement.className = "Gras Espace";
                    divGrasElement.setAttribute("aria-label", "MOYENNE GÉNÉRALE");

                    var divNoteElement = document.createElement("div");
                    divNoteElement.style.float = "right";
                    divNoteElement.textContent = moyenneG.toString();

                    var divTitreElement = document.createElement("div");
                    divTitreElement.textContent = "MOYENNE GÉNÉRALE";

                    divGrasElement.appendChild(divNoteElement);
                    divGrasElement.appendChild(divTitreElement);
                    divLigneElement.appendChild(divGrasElement);
                    divContenuElement.appendChild(divLigneElement);
                    articleElement.appendChild(divContenuElement);
                    divElement.appendChild(articleElement);
                }
                temp()

                const positionToMakeElement = document.querySelector("div#id_7 > div.objetBandeauEntete_fullsize")
                positionToMakeElement.appendChild(divElement)

                // allLine = document.querySelectorAll('.AvecMain')
                // lastLine = allLine[allLine.length - 1]
                // if (lastLine != null) positionToMakeElement.insertAdjacentElement("beforeend", divElement)
            }
        }, 500)
    }, 1000)
}