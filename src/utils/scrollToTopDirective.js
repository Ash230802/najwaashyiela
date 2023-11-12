
export default {
  //el => the element that is bound to the directive (button in this case)
  mounted(el) {
    //add a click event listener to the el 
    //when the el is being click, it will trigger the  function
    el.addEventListener('click', () => {
      // Smooth scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
};
