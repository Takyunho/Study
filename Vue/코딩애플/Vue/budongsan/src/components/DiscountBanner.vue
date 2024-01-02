<template>
  
  <div class="discount">
    <h4>지금 결제하면 {{discountAmount}}% 할인</h4>
  </div>

</template>

<script>
export default {
  name : 'DiscountBanner',
  data() {
    return {
      discountAmount: 30,
    }
  },
  mounted() {
    setInterval(() => {
      if (this.discountAmount > 0) {
        this.discountAmount = this.discountAmount - 1;
      }

    },1000)
  },
}
</script>

<style>

  .discount {
    padding: 10px;
    border-radius: 5px;
    background: #eee;
    margin: 10px;
  }

</style>