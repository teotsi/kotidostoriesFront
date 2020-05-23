import axios from "axios";

function normalizeCategory(category) {
  return category.toLowerCase() === "poems" ? "poem" : category.toLowerCase();
}

function normalizeReaction(reaction) {
  let reactions = {
    'thumbs-up': 'like',
    'heart': 'love',
    'laugh-beam': 'laugh',
    'lightbulb': 'inspiring'
  };
  return reactions[reaction.toLowerCase()];
}

function fadeSide() {
  let side = document.querySelector(".side"); //selecting sidebar
  if (side) { //checking if sidebar has been defined in document
    window.addEventListener('scroll', e => {
      let mouseElement = document.querySelector(".side:hover");
      if (!mouseElement) { //if the user is not hovering the sidebar, dim it
        side.style.opacity = 0.5;
      }
    });

    side.addEventListener('mouseover', e => {
      side.style.opacity = 1; //reset sidebar opacity
    })
  }
}

function truncate(str, type) { //truncates titles and previews that are too long
  let limit;
  if (type === 'title') {
    limit = 25;
  } else {
    limit = 70;
  }
  if (str.length > limit) {
    str = str.substring(0, limit - 3) + '...'
  }
  return str;
}

function addSlug(params, slug) {
  let url = window.location.toString();
  if (params.slug === undefined) {
    if (!url.endsWith('/')) { //checking if the url already has /
      url += '/'
    }
    url += slug
  }
  history.replaceState({}, document.title, url) // replacing the url without reloading the page

}

function loadUsers() {
  axios.get('http://localhost:5000/user/')
    .then(response => {
      return response.data.users;
    })
}

function estimateReadingTime(text) {
  const wordsPerMinute = 200; // Average case.
  if (text) {
    return Math.ceil(text.split(" ").length / wordsPerMinute);
  }
}

export {normalizeCategory, normalizeReaction, fadeSide, truncate, addSlug, loadUsers, estimateReadingTime};
