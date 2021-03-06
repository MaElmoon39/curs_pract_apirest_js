//Código del profe Juan DC:
searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back(); //con esto vuelvo a la página anterior, que puede o no ser el home
  //location.hash = "#home"; //con esto vuelvo desde la sección en la que estoy, al home
});

//Código del compañero Orlando Díaz:
//arrowBtn.addEventListener("click", () => (location.hash = "home"));
// trendingBtn.addEventListener("click", () => (location.hash = "trends"));
// searchFormBtn.addEventListener("click", () => (location.hash = "search="));

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  console.log({ location });

  //Código del profe Juan DC:
  //   if (location.hash.startsWith("#trends")) {
  //     trendsPage();
  //   } else if (location.hash.startsWith("#search=")) {
  //     searchPage();
  //   } else if (location.hash.startsWith("#movie=")) {
  //     movieDetailsPage();
  //   } else if (location.hash.startsWith("#category=")) {
  //     categoriesPage();
  //   } else {
  //     homePage();
  //   }

  //Código del compañero Orlando Díaz: esto es operadores ternarios; así, lo que esté después de ? es cuando se cumple la condición y lo que está después de : es cuando no se cumple (súper pro)
  location.hash.startsWith("#trends")
    ? trendsPage()
    : location.hash.startsWith("#search=")
    ? searchPage()
    : location.hash.startsWith("#movie=")
    ? movieDetailsPage()
    : location.hash.startsWith("#category=")
    ? categoriesPage()
    : homePage();

  //Estas dos líneas de código me ayudan a ir siempre desde la vista principal desde el hombe a la sección que quiera ir
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function homePage() {
  console.log("Home!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function categoriesPage() {
  console.log("Categories!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("="); //devuelve un array así: ['#category', 'id-name']
  const [categoryId, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;

  getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  console.log("Movie Details!!");

  headerSection.classList.add("header-container--long");
  //headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [_, movieId] = location.hash.split("="); //devuelve un array así: ['#movie', '32131']

  getMovieById(movieId);
}

function searchPage() {
  console.log("Search!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("="); //devuelve un array así: ['#search', 'buscado']
  getMoviesBySearch(query);
}

function trendsPage() {
  console.log("TRENDS");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";

  getTrendingMovies();
}
