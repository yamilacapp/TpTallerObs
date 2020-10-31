$.getJSON("data/qTarantino.json", function(data) {
    document.title = "Filmografía: " + data.name;
    fillHeader(data);
    fillContent(data);
    fillFooter(data.source);
});

function fillHeader(tarantinoObject) {
    let cabecera = '<div class="row">';
    cabecera += '<div class="col-12 text-center">';
    cabecera += '<h1>' + tarantinoObject.name + '</h1>';
    cabecera += '<img src="' + tarantinoObject.image + '" class="img-thumbnail">';
    cabecera += '<h5 class="text-muted">' + new Date(tarantinoObject.birthdate).toLocaleDateString() + " - " + tarantinoObject.birthplace + '</h5>';
    cabecera += '</div></div>';
    $("#header").html(cabecera);
}

function fillContent(tarantinoObject) {
    let cards ='<div class="row">';
    const filmsArray = tarantinoObject.films
    for(var i = 0; i < filmsArray.length; i++) {
        cards += '<div class="col-sm-4">';
        cards += fillCard(filmsArray[i], "film" + i);
        cards += '</div>';
    }
    cards += '</div>';
    $("#content").html(cards);
}

function fillFooter(sourceObject) {
    let footer = '<hr>';
    footer += '<p class="text-right">';
    footer += "Fuente: " + '<a href="' + sourceObject.url + '">' + sourceObject.string + '</a>';
    footer += '</p>';
    $("#footer").html(footer);
}

function fillCard(film,  filmId) {
    let card = '<div class="card text-center">';
    card += '<img src="' + film.image + '" class="card-img-top">';
    card += '<div class="card-body">';
    card += '<h4 class="card-title">' + film.title + '</h4>';
    if (film.hispanicTitle != null){
        card += '<h6 class="card-title">(' + film.hispanicTitle + ')</h6>';
    }
    card += '<h6 class="card-title small">' + film.genre.join(" - ") + '</h6>';
    card += '<h6 class="card-title small font-weight-light">' + film.year + " - " + film.runningTime + " min." + '</h6>';

    // BOTON MODAL
    card += '<footer>';
    card += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#' + filmId + '"> Ver Informacion </button >';
    card += '</footer>';
    
    // MODAL
    card += '<div class="modal fade" id="' + filmId + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    card += '<div class="modal-dialog" ><div class="modal-content">';
    
    card += '<div class="modal-header">';
    card += '<h5 class="modal-title" id="exampleModalLabel">' + film.title + '</h5>';
    card += '</div>';  // header
    
    card += '<div class="modal-body">';
    card += '<dl>';
    card += '<dt class="text-left font-weight-normal">' + "Actores" + '</dt>';
    card += fillDescriptionList (film.starring);
    if(film.awards != null) {
        card += '<dt class="text-left font-weight-normal">' + "Premios" + '</dt>';
        for(var i = 0; i < film.awards.length; i++) {
            card += '<dl>' + film.awards[i].name + " (" + film.awards[i].wins + "/" + film.awards[i].nom + ")" + '</dl>';
        }
    }

    card += '</dl>';
    card += '</div>';  // body
    
    card += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>';
    card += '</div>';  // footer
    card += '</div></div ></div >';
    // FIN MODAL

    card += '</div></div>';
    return card;
}

function fillDescriptionList (itemsList) {
    let line = '';
    for(var i = 0; i < itemsList.length; i++) {
        if(i % 2 == 0) {
            line += '<dl>' + itemsList[i];
            if(i == itemsList.length -1) {
                line += '</dl>';
            }
        } else {
            line += " * " + itemsList[i] + '</dl>';
        }
    }
    return line;
}
