function normalizeCategory(category) {
  return category.toLowerCase() === "poems" ? "poem" : category.toLowerCase();
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
    limit = 20;
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

export {normalizeCategory, fadeSide, truncate, addSlug};
