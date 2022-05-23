<template>
	<div class="sazi-calc">
		<div class="sazi-calc__container">
			<calculation-method></calculation-method>
			<size-input></size-input>
			<result></result>
			<send-form></send-form>
      <modal></modal>
		</div>
	</div>
</template>

<script>
import calculationMethod from "./components/calculation_method.vue"
import sizeInput from "./components/sizeInput.vue"
import result from "./components/result.vue"
import modal from "./components/modal.vue"
import sendForm from "./components/sendForm.vue"
export default {
	components: {
		calculationMethod,
		sizeInput,
		result,
    	modal,
		sendForm
	}
}
</script>
