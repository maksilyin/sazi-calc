<template>
	<transition name="fade">
		<div v-show="show" id="sazi-calc-form" class="sazi-calc__section">
			<h3>Отправить заявку</h3>
			<form class="sazi-calc__form" ref="calcForm">
				<div class="sazi-calc__input-wrapper flex-center">
					<div class="sazi-calc__input-column--names-left column-names">
						<div
							v-for="(input, key) in inputs"
							:key="'nameInput'+key"
							class="sazi-calc__input-name sazi-calc__input-name--send-form">
							<span>{{input.name}}</span>
						</div>
					</div>
					<div class="sazi-calc__input-column text-center">
						<div v-for="(input, key) in inputs" :key="'form-input-'+key" class="sazi-calc__input-item sazi-calc__input-item--send-form sazi-calc__input-item--text">
							<input v-model.trim="formData[input.code]" :class="{active: formData[input.code] !== '', error: errors[input.code] === true}" :type="input.type" :placeholder="input.name" :required="input.requared" class="ph-hide">
						</div>
						<button @click.prevent="send()" :disabled="sending" class="sazi-calc__form-btn">Отправить</button>
					</div>
				</div>
			</form>
		</div>
	</transition>
</template>

<script>
import axios from "axios"
export default {
	data () {
		return {
			sendUrl: "/support/calcsend/",
			resultData: null,
			show: false,
			selectedMethod: null,
			sending: false,
			formData: {
				name: "",
				email: "",
				phone: "",
				city: "",
			},
			errors: {
				name: false,
				email: false,
				phone: false,
				city: false,
			},
			inputs: [
				{name: "Ваше имя", code:"name", type: "text", requared: true},
				{name: "E-mail", code:"email", type: "text", requared: true, preg: /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]/},
				{name: "Телефон", code:"phone", type: "text", requared: false},
				{name: "Город", code:"city", type: "text", requared: true}
			]
		}
	},
	methods: {
		send() {
			var sendData = this.buildSendData();
			if (sendData) {
				var headers = { headers: { 'Content-Type': "application/json; charset=UTF-8" } }
				this.sending = true;
				axios.post(this.sendUrl, sendData, headers).then((response)=>{
					console.log(response)
					this.$root.$emit('showModal', 'sendFormSuccess');
					this.sending = false;
					this.clearForm();
				})
			}
		},
		checkInput() {
			let result = true;
			let req = this.inputs.filter(item => item.requared === true);
			for (var key in this.errors) {
				this.errors[key] = false;
			}
			req.forEach(item => {
				if (this.formData[item.code] === "") {
					this.errors[item.code] = true;
					result = false;
				}
				else if (item.preg !== undefined && !item.preg.test(this.formData[item.code])) {
					this.errors[item.code] = true;
					result = false;
				}
			})
			return result;
		},
		buildSendData() {
			if (!this.checkInput())
				return false;

			let out = {};
			out.method = this.selectedMethod.name;
			out.input = this.resultData.inputSize;
			out.result = this.resultData.results;
			out.layer = this.resultData.layer;
			out.userData = this.formData;
			return out;
		},
		clearForm() {
			for (var key in this.formData) {
				this.formData[key] = "";
			}
		}
	},
	mounted() {
		this.$root.$on("showForm", () => {
			this.show = true;
		});

		this.$root.$on("onSetMethod", (data) => {
			this.selectedMethod = data;
			this.show = false;
		});

		this.$root.$on("onDataResult", (data) => {
			this.resultData = data;
		});
		if (document.calcSendUrl !== undefined) {
			this.sendUrl = document.calcSendUrl;
		}
	}
}
</script>

<style>

</style>