let cards = "";
$.getJSON("data/qTarantino.json", function(data) {
    document.title = "Filmografía: " + data.name;
    fillHeader(data);
    fillContent(data);
    fillFoot(data.source);
});

function fillHeader(tarantinoObject) {
    let cabecera="";
    cabecera += "<div class='row'>";
    cabecera += "<div class='col-12 text-center'>";
    cabecera += "<h1>" + tarantinoObject.name + "</h1>";
    cabecera += "<img src='" + tarantinoObject.image + "' class='img-thumbnail'>";
    cabecera += "<h5 class='text-muted'>" + new Date(tarantinoObject.birthdate).toLocaleDateString() + " - " + tarantinoObject.birthplace + "</h5>";
    cabecera += "</div></div>";
    $("#header").html(cabecera);
   // const header = document.querySelector('header');
   // const headerDiv = document.createElement('div');
  //  headerDiv.className = 'container-fluid text-center';
  // const h1 = document.createElement('h1');
  //  const img = document.createElement('img');
  //  img.className = 'img-thumbnail';
  //  img.alt = tarantinoObject.name;
  //  const h5 = document.createElement('h5');
  //  h5.className = 'text-muted';

  //  h1.textContent = tarantinoObject.name;
  //  img.src = tarantinoObject.image;
  //  h5.textContent = new Date(tarantinoObject.birthdate).toLocaleDateString() + " - " + tarantinoObject.birthplace;

  //  headerDiv.appendChild(h1);
  //  headerDiv.appendChild(img);
  //  headerDiv.appendChild(h5);
  //  header.appendChild(headerDiv);
}

function fillContent(tarantinoObject) {
   // const content = document.querySelector('content');
   // const contentDiv = document.createElement('div');
   // contentDiv.className = 'container-fluid';
    cards +="<div class='row'>";
    const filmsArray = tarantinoObject.films
    for(var i = 0; i < filmsArray.length; i++) {
         cards += "<div class='col-4'>";
      //  if(i % 3 == 0) {
           // row += "";
           // row = document.createElement('div');
           // row.className = 'row';
           // contentDiv.appendChild(row);
      //  }

       // const col = document.createElement('div');
       // col.className = 'col';
        fillCard( filmsArray[i])
       // row.appendChild(col);
       cards += "</div>";
    }
    cards += "</div>";
    $("#contenido").html(cards);
    //content.appendChild(contentDiv);
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

function fillCard( film) {
    cards += "<div class='card text-center'>";
    cards += "<img src='"+ film.image + "' class='card-img-top'>";
    cards += "<div class='card-body'>";
    cards += "<h4 class='card-title'>" + film.title +"</h4>";
    if (film.hispanicTitle != null){
    cards += "<h6 class='card-title'> (" + film.hispanicTitle + ")</h6>";
    }
    cards += "<h6 class='card-title small'> " + film.genre.join(" - ") + "</h6>";
    cards += "<h6 class='card-title small font-weight-light'>" + film.year + " - " + film.runningTime + " min. </h6>";
    //BOTON MODAL
    cards += "<button type='button' class='btn btn - primary' data-toggle='modal' data-target='#exampleModal'> Ver Informacion </button >"
    cards += "</div></div>";
    //MODAL
    //cards += '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">< div class="modal-dialog" ><div class="modal-content"><div class="modal-header">';
   // cards += '<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>';
   // cards += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
   // cards += '<span aria-hidden="true">&times;</span></button></div>';
   // cards += '<div class="modal-body">';
    //AGREGAR BODY
   // cards += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div ></div >';
    //FIN MODAL


    
    //const cardDiv = document.createElement('div');
   // cardDiv.className = 'card text-center';
   // const img = document.createElement('img');
   // img.src= film.image;
   // img.className = 'card-img-top';
   // const bodyDiv = document.createElement('div');
   // bodyDiv.className = 'card-body';


   // const filmName = document.createElement('h4');
   // filmName.className = 'card-title';
   // const hispName = document.createElement('h6');
   // hispName.className = 'card-title';
    //const genre = document.createElement('h6');
   // genre.className = '';
   // const information = document.createElement('h6');
   // information.className = 'card-title small font-weight-light';
    const starring = document.createElement('dl');
    const actors = document.createElement('dt');
    actors.className = 'text-left font-weight-normal';
    const awards = document.createElement('dl');
    const accolades = document.createElement('dt');
    accolades.className = 'text-left font-weight-normal';

    // Card header
    //filmName.textContent = film.title;
   // if(film.hispanicTitle != null)
     //   hispName.textContent = "(" + film.hispanicTitle + ")";
   // genre.textContent = film.genre.join(" - ");
   // information.textContent = film.year + " - " + film.runningTime + " min.";

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
   // bodyDiv.appendChild(filmName);
   // bodyDiv.appendChild(hispName);
   // bodyDiv.appendChild(genre);
   //  bodyDiv.appendChild(information);
   // bodyDiv.appendChild(starring);
   // bodyDiv.appendChild(awards);
   // cardDiv.appendChild(img);
   // cardDiv.appendChild(bodyDiv);
   // column.appendChild(cardDiv);
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
