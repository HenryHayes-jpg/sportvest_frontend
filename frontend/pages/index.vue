<template>
  <div class="text-center">
    <theHeader></theHeader>
    <div class="flex flex-col items-center justify-center px-6 py-3">
      <h1 class="text-md text-white">Once Loved Sports Equipment And Shoes</h1>
      <h1 class="text-7xl text-white">SPORTVEST</h1>
    </div>

    <div class="categories">
      <v-btn
        v-for="category in categories"
        :key="category.id"
        size="medium"
        elevation="8"
        :to="category.link"
        class="inline-block py-3 px-8 bg-teal-900 text-white rounded-md button"
      >
        {{ category.name }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import bgImg from "../assets/static/home_bg.jpeg";
import { useCartStore } from "~/store/cart";
import theHeader from "~/components/theHeader.vue";
import config from "~/config.js"; // Import your API config

export default {
  components: {
    theHeader,
  },
  data() {
    return {
      bg_img: bgImg,
      cartStore: useCartStore(),
      categories: [{ id: 1, name: "All", link: "/products/all" }], // Initial default category
    };
  },
  async created() {
    try {
      const response = await fetch(`${config.apiUrl}/getCategoryNames`);
      const result = await response.json();

      if (result.meta.success) {
        this.categories = [
          { id: 1, name: "All", link: "/products/all" },
          ...result.data.map((category, index) => ({
            id: index + 2, 
            name: category,
            link: `/products/${category}`, // Replace spaces with underscores
          })),
        ];
      } else {
        console.error("Failed to fetch categories:", result.meta.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
};
</script>

<style scoped>
.text-center {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 4rem;
  max-width: 40rem;
  margin: 0 auto;
}

.button {
  color: rgb(230, 226, 226);
  background-color: rgb(19, 82, 82);
  margin: 0.3rem;
  margin-bottom: 0.8rem;
  width: 10rem;
}

@media (max-width: 768px) {
  .text-md {
    font-size: 15px;
  }
  .text-7xl {
    font-size: 60px;
  }
}
</style>
