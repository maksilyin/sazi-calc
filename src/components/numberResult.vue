<template>
<transition name="fade-2">
	<span v-show="show" ref="number" :class="number">{{printNumber}} кг</span>
</transition>
</template>

<script>
export default {
	props: {
		number: ''
	},
	data() {
		return {
			printNumber: '',
			show: true
		}
	},
	watch: {
		number: function(num) {
			this.show = false;
			setTimeout(()=>{
				this.printNumber = num.toFixed(2)
				this.show = true;
			}, 400)
		}
	},
	mounted() {
		this.printNumber = this.number.toFixed(2)
	}
}
</script>

<style lang="sass" scoped>
	
</style>