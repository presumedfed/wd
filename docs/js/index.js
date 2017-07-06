
// function to fetch the data
function fetchData() {
  const endpoint = '/data.json';
  
  return fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        console.log(error);

        return Promise.reject(error);
      }

      return response.json();
    })
    .then(json => {
    	return json;
    })
    .catch(errpr => {
    	// for the static page, return the mock data
        return [{"title":"cat jumping","image_name":"cat-jumping.jpg","description":"Cras ultrices dignissim ligula, quis dignissim nunc dapibus eu","is_published":true},{"title":"golden gate bridge","image_name":"golden-gate.jpg","description":"We visited the Golden Gate Bridge and admired it like we we're simply tourists.","is_published":true},{"title":"Empire State Building","image_name":"empire-state.jpg","description":"Suspendisse aliquam nunc tortor, consectetur sollicitudin sapien sodales non husap ien sodales non huidk edinwoskushidk edinwoskusho pashku husap ien sodales non huidk edinwoskushidk edinwoskusho pashku hu icitudin sapien sodales non husap ien sodales non huidk edinwoskushidk edinwoskusho pashku husap ien sodales non huidk edinwoskushidk edinwoskusho pashku hu sap ien sodales non huidk edinwoskushidk edinwoskusho pashku shi sapier soficceion sit amet, consectetur a.","is_published":true},{"title":"planning phase","image_name":"planning.jpg","description":"Nulla sapien eros, consectetur nec odio quis, tristique pretium lorem.","is_published":true},{"title":"co-workers","image_name":"office-people.jpg","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum commodo enim, id ullamcorper diam iaculis lobortis.","is_published":true},{"title":"archery","image_name":"arrows.jpg","description":"In ac ante vestibulum, pharetra est in, molestie odio. Aenean laoreet lobortis tempus.","is_published":true},{"title":"Mountains","image_name":"mountain.jpg","description":"Curabitur luctus tortor nunc, vitae volutpat mauris scelerisque in.","is_published":false},{"title":"Ocean view","image_name":"ocean.jpg","description":"Morbi commodo neque nisi, lacinia rhoncus justo gravida id.","is_published":"true"},{"title":"food for thought","image_name":"error.jpg","description":"Donec at ligula mattis, vestibulum enim ac, elementum metus."},{"title":"grassy fields from san francisco, california","image_name":"grass.jpg","description":" Phasellus mattis sodales ante eget egestas. Sed sed vestibulum sem.","is_published":true}];
    });
}

function renderImages(imageData, ascending = true) {
	const IMG_DIR = "./images/";
	let html = '';

	// sort the data in ascending order of the title
	imageData.sort(sortby_title);

	// if ascending is false, the reverse the order
	if (!ascending) {
		imageData.reverse();
	}

	// create markup of each card
	for (let i=0; i < imageData.length; i++) {
		const image = imageData[i];

		if (image.is_published) {
			let imageCard = '<div class="card">';
			imageCard += '<figure>'
			imageCard += '<img src="' + IMG_DIR + image.image_name + '" alt="" />';
			imageCard += '<figcaption>';
			imageCard += '<p class="image-title">' + image.title + '</p>';
			imageCard += '<p class="image-filename">' + image.image_name + '</p>'
			imageCard += '</figcaption>';
			imageCard += '</figure>'
			imageCard += '<p class="image-description">' + image.description + '</p>'
			imageCard += '<p class="image-actions"> <i class="material-icons">favorite</i><i class="material-icons">grade</i></p>'

			imageCard += "</div>";
			html += imageCard;
		}
	}

	document.getElementById('cards').innerHTML = html;
}

// function to sort by title property of the object
function sortby_title(a,b) {
	const titleA = a.title.toUpperCase(); 
  	const titleB = b.title.toUpperCase(); 

  	if (titleA < titleB) {
    	return -1;
  	} else if (titleA > titleB) {
    	return 1;
  	} else {
	  	return 0;
  	}
}

fetchData()
	.then(response => {
		// render the images
		renderImages(response);

		const sortby = document.getElementById('sortby');

		// add event listener for the sort
		sortby.addEventListener('click', function() {
			const hasClass = sortby.classList.contains('ascending');

			// if it has the ascending class, you want to sortby ascending, if it doesn't, then descending
			renderImages(response, hasClass);

			// toggle the ascending class
			if (hasClass) {
				sortby.classList.remove('ascending');
			} else {
				sortby.classList.add('ascending');
			}
		});
	})
	.catch(error => {
		console.log(error);
	});
