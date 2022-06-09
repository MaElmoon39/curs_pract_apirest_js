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

  //Esto se hace para que cada vez que se devuelva desde otra vista del app al home, no se añadan más posters de movie trendings debido al appendChild
  trendingMoviesPreviewList.innerHTML = "";

  movies.forEach((movie) => {
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

  //Esto se hace para que cada vez que se devuelva desde otra vista del app al home, no se añadan más categorías de movie trendings debido al appendChild
  categoriesPreviewList.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id); //esto es para agregar un atributo
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    categoriesPreviewList.appendChild(categoryContainer);
  });
}

async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  //console.log({ data, movies });

  //Esto se hace para que cada vez que se devuelva desde otra vista del app al home, no se añadan más elementos de movie trendings debido al appendChild
  genericSection.innerHTML = "";

  movies.forEach((movie) => {
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
    genericSection.appendChild(movieContainer);
  });
}

//se comentan en este archivo y se vinculan en la función homePage()
//getTrendingMoviesPreview();
//getCategoriesPreview();
