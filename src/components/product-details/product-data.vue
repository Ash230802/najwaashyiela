<script>
const rawData = [
  {
    productId: "1",
    name: "Black Strip Bra",
    price: "20",
    imagePath: "/clothing1.jpg",
  },
  {
    productId: "2",
    name: "Navy Active Bra",
    price: "50",
    imagePath: "/clothing2.jpg",
  },
  {
    productId: "3",
    name: "Light Green Bra",
    price: "15",
    imagePath: "/clothing3.jpg",
  },
  {
    productId: "4",
    name: "Brown Legging",
    price: "50",
    imagePath: "/clothing4.jpg",
  },
  {
    productId: "5",
    name: "Pink Active Set",
    price: "190",
    imagePath: "/Latest1.jpg",
  },
  {
    productId: "6",
    name: "Gray Active Set",
    price: "120",
    imagePath: "/Latest2.jpg",
  },
  {
    productId: "7",
    name: "Sunset Active Bra",
    price: "50",
    imagePath: "/Latest3.jpg",
  },
  {
    productId: "8",
    name: "White Active Set",
    price: "200",
    salesPrice: "120",
    imagePath: "/Sale1.jpg",
  },
  {
    productId: "9",
    name: "Dark Green Bra",
    price: "50",
    salesPrice: "35",
    imagePath: "/Sale2.jpg",
  },
];

// Add the showWishlistMessage property to each item
//... represents the object itself which in this case, the rawCarouselData, refer it as product
//create a new array called carouselItems based on rawCarouselData array
const Items = rawData.map(product => ({ ...product, showWishlistMessage: false }));

export default Items;
</script>
