const apiKey = "56474dce";
const apiUrl = "https://www.omdbapi.com/";


window.addEventListener("load", () => {
    const searchForm = document.querySelector("#searchForm");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = new FormData(searchForm).get("title");

        fetchMovieInfo(title)
            .then((movieData) => {

    			const filmDescript = `
        			<div style="text-align: center;">
            			<h2>${movieData.Title}</h2>
        			</div>
        			<div style="display: flex; justify-content: center;">
            			<img src="${movieData.Poster}" alt="${movieData.Title}">
        			</div>
        			<p><strong>Год выпуска:</strong> ${movieData.Year}</p>
        			<p><strong>Жанр:</strong> ${movieData.Genre}</p>
        			<p><strong>Режиссер:</strong> ${movieData.Director}</p>
        			<p><strong>Актеры:</strong> ${movieData.Actors}</p>
        			<p><strong>Описание:</strong> ${movieData.Plot}</p>
   				`;
    
    			document.querySelector("#movieInfo").innerHTML = filmDescript;

        	}) 
            .catch((error) => {
            	document.querySelector("#movieInfo").innerHTML = `<p>${error.message}</p>`;
        	});
    });
});


const fetchMovieInfo = (title) => {
    return fetch(`${apiUrl}?t=${title}&apikey=${apiKey}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Не удалось получить данные о фильме");
            }
            return response.json();
        })
        .then((data) => {
            if (data.Response === "False") {
                throw new Error(data.Error);
            }
            return data;
        });
};
