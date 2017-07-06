
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
    	return error;
    });
}

function renderImages(imageData, ascending = true) {
	const IMG_DIR = "/images/";
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
