const requestURL = 'data/qTarantino.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    const tarantinoJson = request.response;
    document.title = "Filmografía: " + tarantinoJson.name;
    fillHeader(tarantinoJson);
    fillContent(tarantinoJson);
    fillFoot(tarantinoJson.source);
}

function fillHeader(tarantinoObject) {
    const header = document.querySelector('header');
    const headerDiv = document.createElement('div');
    headerDiv.className = 'container-fluid text-center';
    const h1 = document.createElement('h1');
    const img = document.createElement('img');
    img.className = 'img-thumbnail';
    img.alt = tarantinoObject.name;
    const h5 = document.createElement('h5');
    h5.className = 'text-muted';

    h1.textContent = tarantinoObject.name;
    img.src = tarantinoObject.image;
    h5.textContent = new Date(tarantinoObject.birthdate).toLocaleDateString() + " - " + tarantinoObject.birthplace;

    headerDiv.appendChild(h1);
    headerDiv.appendChild(img);
    headerDiv.appendChild(h5);
    header.appendChild(headerDiv);
}

function fillContent(tarantinoObject) {
    const content = document.querySelector('content');
    const contentDiv = document.createElement('div');
    contentDiv.className = 'container-fluid';

    const filmsArray = tarantinoObject.films
    for(var i = 0; i < filmsArray.length; i++) {
        var row;
        if(i % 3 == 0) {
            row = document.createElement('div');
            row.className = 'row';
            contentDiv.appendChild(row);
        }
        const col = document.createElement('div');
        col.className = 'col';
        fillCard(col, filmsArray[i])
        row.appendChild(col);
    }
    
    content.appendChild(contentDiv);
}

function fillFoot(sourceObject) {
    const foot = document.querySelector('foot');
    const footDiv = document.createElement('div');
    footDiv.className = 'container-fluid';
    const p = document.createElement('p');
    p.className = 'text-right';
    
    const string = sourceObject.string;
    const source = string.link(sourceObject.url);
    p.innerHTML = "Fuente: " + source;
    
    footDiv.appendChild(document.createElement('hr'));
    footDiv.appendChild(p);
    foot.appendChild(footDiv);
}

function fillCard(column, film) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card text-center';
    const img = document.createElement('img');
    img.src= film.image;
    img.className = 'card-img-top';
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'card-body';


    const filmName = document.createElement('h4');
    filmName.className = 'card-title';
    const hispName = document.createElement('h6');
    hispName.className = 'card-title';
    const genre = document.createElement('h6');
    genre.className = 'card-title small';
    const information = document.createElement('h6');
    information.className = 'card-title small font-weight-light';
    const starring = document.createElement('dl');
    const actors = document.createElement('dt');
    actors.className = 'text-left font-weight-normal';
    const awards = document.createElement('dl');
    const accolades = document.createElement('dt');
    accolades.className = 'text-left font-weight-normal';

    // Card header
    filmName.textContent = film.title;
    if(film.hispanicTitle != null)
        hispName.textContent = "(" + film.hispanicTitle + ")";
    genre.textContent = film.genre.join(" - ");
    information.textContent = film.year + " - " + film.runningTime + " min.";

        // starring
    actors.textContent = "Actores:";
    starring.appendChild(actors);
    const actorsList = film.starring;
    fillDescriptionList(starring, actorsList);
    
    // awards
    if(film.awards != null) {
        accolades.textContent = "Premios: ";
        awards.appendChild(accolades);
        for(var i = 0; i < film.awards.length; i++) {
            const award = document.createElement('dd');
            award.textContent = film.awards[i].name + " (" + film.awards[i].wins + "/" + film.awards[i].nom + ")";
            awards.appendChild(award);
        }
    }

    // Elements nesting
    bodyDiv.appendChild(filmName);
    bodyDiv.appendChild(hispName);
    bodyDiv.appendChild(genre);
    bodyDiv.appendChild(information);
    bodyDiv.appendChild(starring);
    bodyDiv.appendChild(awards);
    cardDiv.appendChild(img);
    cardDiv.appendChild(bodyDiv);
    column.appendChild(cardDiv);
}

function fillDescriptionList (descriptionList, itemsList) {
    var line;
    for(var i = 0; i < itemsList.length; i++) {
        if(i % 2 == 0) {
            line = itemsList[i];
            if(i == itemsList.length -1)
                descriptionList.appendChild(getDescriptionItem(line));
        } else {
            line += " * " + itemsList[i];
            descriptionList.appendChild(getDescriptionItem(line));
        }
    }
}

function getDescriptionItem(line) {
    const item = document.createElement('dd');
    item.textContent = line;
    return item;
}
