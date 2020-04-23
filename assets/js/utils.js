const util = {
  normalizeCategory(category){
    return category.toLowerCase() === "poems" ? "poem" : category.toLowerCase();
  },

};
export default util
