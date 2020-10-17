const requestURL = 'data/qTarantino.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    const tarantinoJson = request.response;
    document.title = "Filmografía: " + tarantinoJson.name;
    fillContent(tarantinoJson);
    fillFoot(tarantinoJson.source);
}

function fillContent(tarantinoObject) {
    const content = document.querySelector('content');
    const table = document.createElement('table');
    const caption = document.createElement("caption");
    const h1 = document.createElement('h1');
    const h5 = document.createElement('h5');
    const img = document.createElement('img');

    img.src = tarantinoObject.image;
    console.log(tarantinoObject.image);
    h1.textContent = tarantinoObject.name;
    caption.appendChild(h1);
    h5.textContent = new Date(tarantinoObject.birthdate).toLocaleDateString() + " - " + tarantinoObject.birthplace;
    caption.appendChild(h5);
    caption.appendChild(img);
    table.appendChild(caption);
    
    fillTable(table, tarantinoObject.films);
    
    content.appendChild(table);
}

function fillTable(table, filmsArray) {
    
    for(var i = 0; i < filmsArray.length; i++) {
        var row;
        if(i % 3 == 0){
            row = document.createElement('tr');
            table.appendChild(row);
        }
        const cell = document.createElement('td');
        fillCell(cell, filmsArray[i]),
        row.appendChild(cell);
    }
    
}

function fillCell(cell, film) {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'header';
    const filmName = document.createElement('h3');
    const hispName = document.createElement('p');
    const information = document.createElement('p');
    information.className = 'grey';
    const genre = document.createElement('p');
    const starringDiv = document.createElement('div');
    starringDiv.className = 'starring';
    const starring = document.createElement('dl');
    const actors = document.createElement('dt');
    const awardsDiv = document.createElement('div');
    awardsDiv.className = 'awards';
    const awards = document.createElement('dl');
    const accolades = document.createElement('dt');
    
    // header
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
    
    headerDiv.appendChild(filmName);
    headerDiv.appendChild(hispName);
    headerDiv.appendChild(genre);
    headerDiv.appendChild(information);
    starringDiv.appendChild(starring);
    awardsDiv.appendChild(awards);
    cell.appendChild(headerDiv);
    cell.appendChild(starringDiv);
    cell.appendChild(awardsDiv);
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

function fillFoot(sourceObject) {
    const foot = document.querySelector('foot');
    const footDiv = document.createElement('div');
    footDiv.className = 'foot';
    const p = document.createElement('p');
    
    const string = sourceObject.string;
    const source = string.link(sourceObject.url);
    p.innerHTML = "Fuente: " + source;
    
    footDiv.appendChild(document.createElement('hr'));
    footDiv.appendChild(p);
    foot.appendChild(footDiv);
}
