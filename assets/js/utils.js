const util = {
  normalizeCategory(category){
    return category === "poems" ? "poem" : category.toLowerCase();
  },

};
export default util
