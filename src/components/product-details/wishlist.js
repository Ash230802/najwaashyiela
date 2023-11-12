
export function toggleWishlistMessage(item) {

    item.showWishlistMessage = true;
  
    setTimeout(() => {
      item.showWishlistMessage = false;
    }, 3000);
  }
  