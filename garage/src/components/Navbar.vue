<template>
  <section id="header">
    <!-- Navbar -->
    <nav class="bg-white shadow">
      <div class="container mx-auto px-6 py-3">
        <div class="flex items-center justify-between">
          <div class="text-gray-500 md:flex md:items-center">
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                fill="currentColor"
              />
            </svg>
            <span class="mx-1 text-sm font-medium text-gray-500">IDN</span>
          </div>
          <button
            @click.prevent="toHome"
            class="w-full focus:outline-none text-gray-800 md:text-center text-2xl font-semibold"
            style="text-align: center"
          >
            STR GARAGE
          </button>
          <div class="flex items-center justify-end w-100">
            <button
              @click="toBookmark"
              v-if="isLoggedIn && isCustomer"
              class="text-gray-500 focus:outline-none mx-4 sm:mx-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <!-- cart button -->
            <button
              @click.prevent="toMyProduct"
              v-if="isLoggedIn && !isCustomer"
              class="text-gray-500 focus:outline-none mx-4 sm:mx-0"
            >
              My Product
            </button>

            <button
              @click.prevent="toAdd"
              v-if="isLoggedIn && !isCustomer"
              class="text-gray-500 focus:outline-none mx-4 sm:mx-0"
            >
              Add Product
            </button>

            <button
              @click.prevent="toChat"
              v-if="isLoggedIn"
              class="text-gray-500 focus:outline-none mx-4 sm:mx-0"
            >
              Let's Chat
            </button>

            <button
              @click.prevent="toLogin"
              v-if="!isLoggedIn"
              class="text-gray-500 focus:outline-none mx-4 sm:mx-0"
              style="margin-right: 0.5rem"
            >
              Login
            </button>
            <button
              @click.prevent="toRegister"
              v-if="!isLoggedIn"
              class="text-gray-500 focus:outline-none mx-4 sm:mx-0"
            >
              Register
            </button>
            <button
              @click.prevent="logout"
              v-if="isLoggedIn"
              class="text-gray-500 focus:outline-none mx-4 sm:mx-0"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    isCustomer() {
      return this.$store.state.isCustomer;
    },
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "Login" }).catch(() => {});
    },
    toRegister() {
      this.$router.push({ name: "RegisterCust" }).catch(() => {});
    },
    toHome() {
      const url = "page=1&size=4";
      this.$store.commit("NOTBOOKMARKPAGE");
      this.$store.commit("QUERY", url);
      this.$store.dispatch("getAllProducts");
      this.$store.commit("CLEARALL");
      this.$router.push({ name: "Home" }).catch(() => {});
    },
    logout() {
      this.$store.commit("NOTBOOKMARKPAGE");
      this.$store.commit("LOGOUT");
    },
    toMyProduct() {
      this.$store.dispatch("myProduct");
    },
    toBookmark() {
      this.$router.push({ name: "Bookmark" }).catch(() => {});
    },
    toAdd() {
      this.$router.push({ name: "AddProduct" }).catch(() => {});
    },
    toChat() {
      this.$router.push({ name: "Chat" }).catch(() => {});
    },
  },
};
</script>

<style></style>
