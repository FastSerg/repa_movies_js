const siteUrl = 'https://www.omdbapi.com/';
const searchStr = '2012';
let moviesList = null;

const createElem = (type, attrs, container) => {
 const el = document.createElement(type);
  
  Object.keys(attrs).forEach((key) => {

    el.setAttribute(key, attrs[key])
    
  })
  
  container.append(el);
}

const createMarkup = () => {

const container = document.createElement('div');

container.setAttribute('class', 'container');

const h1 = document.createElement('h1');

h1.innerHTML = 'Приложение для поиска фильмов';

container.append(h1);
document.body.prepend(container);

const moviesContainer = document.createElement('div');
moviesContainer.setAttribute('class', 'movies');
container.append(moviesContainer);

moviesList = document.querySelector('.movies');
}

const addMovieToList = (movie) => {
  const item = document.createElement('div');
  
  item.setAttribute('class', 'movie');
  moviesList.append(item);

  createElem('img', {
    class: 'movie__image',
    src: /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no-image.png',
    alt: movie.Title,
    title: movie.Title,

  }, item)
  // const img = document.createElement('img');
  // img.setAttribute('class', 'movie__image');
  // img.setAttribute('src', /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no-image.png');

  // img.setAttribute('alt', movie.Title);
  // img.setAttribute('title', movie.Title);


  // moviesList.append(item);
  // item.append(img);
 
}

const getData = (url) => fetch(url)
  .then((res) =>  res.json())
  .then((json) => {
    if(!json || !json.Search) throw Error('Сервер вернул неправильный обьект');
    return json.Search;
});



createMarkup()
getData(`${siteUrl}?s=${searchStr}&apikey=c6369322`)
  .then((movies) => movies.forEach(movie => addMovieToList(movie)))
  .catch((err) => console.error(err));
