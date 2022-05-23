<template>
  	<div class="sazi-calc__section no-border">
		<h3>Отправьте заявку или подберите точку продаж:</h3>
		<div class="sazi-calc__buttons-wrapper">
			<button @click="showForm(0)" class="sazi-calc__btn" :class="{active: selected==0}">Отправить заявку на покупку материала</button>
			<a :href="salespoints" target="__blank" class="sazi-calc__btn" :class="{active: selected==1}">Найти ближайшую точку продаж</a>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			selected: null,
			salespoints: /salespoints/,
		}
	},
	methods: {
		showForm(select) {
			if (this.selected != select) {
				this.selected = select;
				this.$root.$emit('showForm', true);
				setTimeout(()=>{
					var formBlock = document.querySelector('#sazi-calc-form');
					var windowTop = window.pageYOffset
					if (windowTop + innerHeight < formBlock.offsetTop + formBlock.clientHeight) {
						var offset = formBlock.clientHeight
						this.$scrollTo('#sazi-calc-form', 1800, {easing: "ease", cancelable: false, offset: -offset});
					}
				},100)
			}
		}
	},
	mounted: function() {
		if (document.calcSalespointsLink !== undefined) {
			this.salespoints = document.calcSalespointsLink;
		}
		this.$root.$on("onSetMethod", () => {
			this.selected = 0;
		})
  	},
}
</script>
<style lang="sass" scoped>
	.sazi-calc__buttons-wrapper 
		max-width: 585px !important
</style>
