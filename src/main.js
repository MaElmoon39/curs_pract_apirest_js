//console.log("Hello world");
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

//Función asíncrona para obtener de forma dinámica la información de movies trending del día desde la API de la página TheMovieDB
async function getTrendingMoviesPreview() {
  //Esto es sin usar axios, solo fetch
  //   const res = await fetch(
  //     "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
  //   );
  //   const data = await res.json();
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  //console.log({ data, movies });

  movies.forEach((movie) => {
    const trendingMoviesPreviewList = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title); //esto es para agregar un atributo
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  });
}

//Función asíncrona para obtener de manera dinámica las categorías de las películas esde la API de la página TheMovieDB
async function getCategoriesPreview() {
  //Esto es sin usar axios, solo fetch
  //   const res = await fetch(
  //     "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY
  //   );
  //   const data = await res.json();
  const { data } = await api("genre/movie/list");
  const categories = data.genres;
  //console.log({ data, movies });

  categories.forEach((category) => {
    const categoriesPreviewList = document.querySelector(
      "#categoriesPreview .categoriesPreview-list"
    );
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id); //esto es para agregar un atributo
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    categoriesPreviewList.appendChild(categoryContainer);
  });
}

//se comentan en este archivo y se vinculan en la función homePage()
//getTrendingMoviesPreview();
//getCategoriesPreview();
