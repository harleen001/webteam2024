document.addEventListener("DOMContentLoaded", () => {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("intersecting");
          entry.target.classList.remove("invisible");
        } else {
          entry.target.classList.remove("intersecting");
          entry.target.classList.add("invisible");
        }
      });
    };
  
    const options = {
      threshold: 0.5,
      root: null,
      margin: 0,
    };
  
    const observer = new IntersectionObserver(callback, options);
  
    const observeCards = () => {
      document.querySelectorAll(".card-product").forEach((card) => {
        observer.observe(card); 
      });
      document.querySelectorAll(".blog-card").forEach((card) => {
        observer.observe(card); 
      });
    };
  
    observeCards();
  
    const mutationCallback = (mutationsList, mutationObserver) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          observeCards();
        }
      }
    };
  
    const mutationObserver = new MutationObserver(mutationCallback);
  
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  });
  