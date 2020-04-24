const util = {
  normalizeCategory(category){
    return category.toLowerCase() === "poems" ? "poem" : category.toLowerCase();
  },
  fadeSide(){
    let side = document.querySelector(".side");
    window.addEventListener('scroll', e => {
      let mouseElement = document.querySelector( ".side:hover" );
      if (!mouseElement){
        side.style.opacity=0.5;
      }
    });
    side.addEventListener('mouseover',e=>{
      side.style.opacity=1;
    })
  }
};
export default util
