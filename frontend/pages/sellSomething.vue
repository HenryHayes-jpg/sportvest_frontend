<template>
  <div>
  <theHeader :inCart="false" :inSellSomething="true"> </theHeader>
    
    <h1 class="text-white text-4xl text-center my-8">Sell Something</h1>
    
  <div class="form-wrapper">

    <form @submit.prevent="submitForm" class="form-content">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="name" />
      </div>
      <div class="form-group">
        <label for="surname">Surname:</label>
        <input id="surname" v-model="surname" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price (R):</label>
        <input type="number" id="price" v-model="price" />
      </div>
      <div class="form-group">
        <label for="cell">Cell Number:</label>
        <input type="tel" id="cell" v-model="cell" />
      </div>
      <div class="form-group">
        <label for="email">Email Address:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div v-for="index in 6" :key="index" class="form-group">
        <template v-if="index === 1 || images[index - 2]">
          <!-- <img :src="formData.images[index - 1]" :alt="'Image ' + index" class="uploaded-image"> -->
          <label :for="'image' + index">Image {{ index }}:</label>
          <input
            type="file"
            :id="'image' + index"
            @change="onImageChange($event, index)"
            accept="image/*"
          />
        </template>
      </div>
      <button class="submit-button" type="submit">Submit</button>
    </form>
  </div>
  <br />
  <div class="selling-process">
    <h2>
      To ensure the safety and satisfaction of both the buyer and the seller, we
      follow the following process:
    </h2>
    <ol>
      <li>
        <b>Submit Photos:</b> Share clear photos of your gear/shoes for
        assessment.
      </li>
      <li>
        <b>Estimated Price:</b> Give an indication of what you would like to ask
        for this product.
      </li>
      <li>
        <b>Arrange Pickup:</b> You can bring the items to one of our designated
        pick-up points, or if it's more convenient for you, you can simply send
        them to us via a trusted courier service.
      </li>
      <li>
        <b>Professional Presentation:</b> We'll carefully inspect and clean your
        items, capturing high-quality photos and creating captivating artwork
        for effective marketing.
      </li>
      <li>
        <b>Finalize Price:</b> We'll confirm the final selling price with your
        input.
      </li>
      <li>
        <b>Online Listing:</b> We'll promote your gear/shoes on our website and
        other platforms.
      </li>
      <li>
        <b>Buyer's Payment:</b> Buyers will make their payments to us securely.
      </li>
      <li>
        <b>Your Payment:</b> Once we receive the payment, we'll promptly
        transfer your earnings via EFT.
      </li>
    </ol>
    <p>
      <b
        >These steps outline the process of selling your gear/shoes through our
        website. Our aim is to simplify the selling experience, ensuring fair
        prices, effective promotion, and secure payments.</b
      >
    </p>
  </div>
</div>
</template>
  
<script>
import { useCartStore } from "~/store/cart";
import theHeader from "~/components/theHeader.vue";
import { toast } from "vue3-toastify";
import Customer from "~/services/server/customer"; // Import Customer service
import "vue3-toastify/dist/index.css";
import config from "~/config";

export default {
  components: {
    theHeader,
  },
  data() {
    return {
      cartStore: useCartStore(),
      name: "",
      surname: "",
      description: "",
      price: null,
      images: [],
      cell: "",
      email: "",
    };
  },

  methods: {
    onImageChange(event, index) {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.images[index - 1] = reader.result;
      };

      reader.readAsDataURL(file);
    }
},

    async submitForm() {
      try {
        console.log("Validation Check:", {
        name: this.name,
        surname: this.surname,
        description: this.description,
        price: this.price,
        cell: this.cell,
        email: this.email,
        images: this.images,
      });
        if (this.validateForm()) {
          const toastId = toast("Uploading product information");

          // Prepare form data
          const formData = { 
          name: this.name,
          surname: this.surname,
          description: this.description,
          price: this.price,
          cell: this.cell,
          email: this.email,
          images: this.images,
        };
        
          const response = await Customer.submitProduct(formData);

          // Clear the form fields
          this.name = "";
          this.surname = "";
          this.description = "";
          this.price = null;
          this.cell = "";
          this.images = [];
          this.email = "";

          // Handle the response
          if (response && response.meta.success) {
            alert("Your product submission has been uploaded. We will contact you shortly.");
          } else {
            alert("There was an issue uploading your product. Please try again.");
          }
        } else {
          alert("Please fill in all the fields and upload at least 1 picture of the product");
        }
      } catch (error) {
        console.error(error);
        alert("There was an issue uploading your product. Please try again.");
      } finally {
        toast.clear(toastId);
      }
    },

    // Form validation
    validateForm() {
      if (this.name == "") return false;
      if (this.surname == "") return false;
      if (this.description == "") return false;
      if (this.price == null) return false;
      if (this.cell == "") return false;
      if (this.images.length == 0) return false;
      if (this.email == "") return false;
      return true;
    },
  },
};
</script>

  <style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
}

.form-content {
  width: 80%;
  max-width: 400px;
  margin-top: 2rem;
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #047481;
  font-weight: bold;
}

textarea,

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  background-color: #047481;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.uploaded-image {
  max-width: 200px;
  margin-bottom: 1rem;
}

.submit-button {
  display: block;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.selling-process {
  /* Add styles to center the content horizontally */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.selling-process h2 {
  /* Add styles to restore the numbered bullets */
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.selling-process ol {
  /* Add styles to restore the numbered bullets */
  text-align: left;
  list-style-type: decimal;
  padding-left: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.selling-process p {
  /* Adjust text color */
}
.selling-process li {
  margin-bottom: 0.5rem;
}
</style>
  