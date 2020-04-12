const util = {
  filterInPlace(a, condition){
    let j = 0;

    a.forEach((e, i) => {
      console.log(e)
      if (a.category==='love'){
        if (i !== j) a[j] = e;
        j++;
      }
    });

    a.length = j;
    console.log(a)
    return a;
  }
};
export default util
