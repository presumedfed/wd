
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

function renderImages(imageData) {
	const IMG_DIR = "/images/";
	let html = '';

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
			imageCard += '<p class="image-description">' + image.description + '</p>'
			imageCard += '<p class="image-actions"> <i class="material-icons">favorite</i><i class="material-icons">grade</i></p>'

			imageCard += "</div>";
			html += imageCard;
		}
	}

	document.getElementById('cards').innerHTML = html;
}

fetchData()
	.then(response => {
		renderImages(response);
	})
	.catch(error => {
		console.log(error);
	});