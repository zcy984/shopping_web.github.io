const { createApp } = Vue;

createApp({
  data() {
    return {
      categories: [
        "Home appliances",
        "Men's and Women's Clothing",
        "Furniture",
        "Food",
        "Books",
      ],
      currentCategory: "Home appliances",
      products: [],
      shoppingList: [
        { name: "Prod2", quantity: 1, price: 1.0 },
        { name: "Prod3", quantity: 2, price: 0.5 },
      ],
      productData: {
        "Home appliances": [
          {
            name: "TV",
            price: 2000,
            imgSrc: "pictures/TV.png",
            link: "product.html",
          },
          {
            name: "computer",
            price: 5000,
            imgSrc: "pictures/computer.png",
            link: "product.html",
          },
          {
            name: "refrigerator",
            price: 1500,
            imgSrc: "pictures/refrigerator.png",
            link: "product.html",
          },
        ],
        "Men's and Women's Clothing": [
          {
            name: "clothes",
            price: 70,
            imgSrc: "pictures/clothes.png",
            link: "product.html",
          },
        ],
        Furniture: [
          {
            name: "desk",
            price: 200,
            imgSrc: "pictures/desk.png",
            link: "product.html",
          },
        ],
        Food: [
          {
            name: "biscuit",
            price: 12,
            imgSrc: "pictures/biscuit.png",
            link: "product.html",
          },
        ],
        Books: [
          {
            name: "book",
            price: 50,
            imgSrc: "pictures/book.png",
            link: "product.html",
          },
        ],
      },
      currentProduct: null,
    };
  },
  methods: {
    loadProducts(category) {
      this.currentCategory = category;
      this.products = this.productData[category];
    },
    checkUrlCategory() {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get("category");
      if (category && this.categories.includes(category)) {
        this.loadProducts(category);
      } else {
        this.loadProducts(this.currentCategory);
      }
    },
    addToCart(product) {
      const existingItem = this.shoppingList.find(
        (item) => item.name === product.name
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.shoppingList.push({
          name: product.name,
          quantity: 1,
          price: product.price,
        });
      }
    },
    loadProductDetails() {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get("category");
      const productName = urlParams.get("name");

      if (category && productName) {
        this.currentCategory = category; // 设置当前分类
        const categoryProducts = this.productData[category];
        this.currentProduct = categoryProducts.find(
          (p) => p.name === productName
        );
      }
    },
  },
  mounted() {
    if (window.location.pathname.includes("product.html")) {
      this.loadProductDetails();
    } else {
      this.checkUrlCategory();
    }
  },
}).mount("#app");
