<template>
  <div class="mb-2 text-left">
    <div>{{ post.content }}</div>
    <div>{{ new Date(post.createdAt).toLocaleString() }} </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post']
}
</script>
