<template>
	<transition name="fade">
		<div v-if="inputData !== null" id="input-size" class="sazi-calc__section">
		<h3>Введите размеры:</h3>
		<transition name="fade">
			<div v-if="show" class="sazi-calc__input-wrapper">
				<transition-group class="sazi-calc__input-wrapper-animate" name="column" tag="div">
				<div v-for="(column, keyColumn) in columns" :key="'column'+keyColumn" class="sazi-calc__input-column">
					<div v-if="columnName" class="sazi-calc__input-column-title">
						<span>{{columnName + " " + (keyColumn+1)}}</span>
						<span v-if="columns.length>1" @click="delColumn(keyColumn)" class="sazi-calc__input-column-close">
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g opacity="1">
								<circle cx="7.5" cy="7.5" r="6.75" fill="white" stroke="#0192F8" stroke-width="1.5"/>
								<line x1="10.6414" y1="4.53033" x2="4.41919" y2="10.7526" stroke="#0192F8" stroke-width="1.5"/>
								<line x1="4.53033" y1="4.46967" x2="10.7526" y2="10.6919" stroke="#0192F8" stroke-width="1.5"/>
							</g>
							</svg>
						</span>
					</div>
					<div v-for="(input, key) in column" :key="'input'+key" class="sazi-calc__input-item">
						<div v-if="input.type=='counter'" class="sazi-calc__input-item counter">
							<span @click="checkZero(input.value-1, input, {keyColumn: keyColumn})" class="count-control minus">
								<svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" y="4.5" width="19" height="19" rx="9.5" fill="white" stroke="#D2D2D7"/>
								<path d="M15,13.13H5v1.74H15Z" fill="#D2D2D7"/>
								</svg>
							</span>
							<input @input="checkResult({keyColumn: keyColumn})" type="number" @change="checkZero($event.target.value, input, {keyColumn: keyColumn})" v-model.number="input.value" class="count">
							<span @click="checkZero(input.value+1, input, {keyColumn: keyColumn})" class="count-control plus">
								<svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect x="0.5" y="4.5" width="19" height="19" rx="9.5" fill="white" stroke="#D2D2D7"/>
									<path d="M14.834 13.542H10.676V9.01H8.916V13.542H4.758V15.28H8.916V19.834H10.676V15.28H14.834V13.542Z" fill="#D2D2D7"/>
								</svg>
							</span>
						</div>
						<input 
							class="ph-hide"
							:class="{active: input.value !== ''}" 
							@input="checkResult({keyColumn: keyColumn})" 
							@blur="stopTimer()"
							v-else type="number" 
							v-model.number="input.value"
							:placeholder="fields[key].name">
					</div>
				</div>
				</transition-group>
				<div class="sazi-calc__input-column column-names">
					<div @click="addInputColumn()" v-if="inputData.addColumn === true" class="sazi-calc__input-column-add">{{inputData.strAddBtn}}</div>
					<div
						v-for="(input, key) in fields"
						:key="'nameInput'+key"
						class="sazi-calc__input-name">
						<span>{{input.name}}</span>
						<span
						v-if="input.hint !== undefined"
						@click="$root.$emit('showModal',input.hint)"
						class="hint">
						</span>
					</div>
				</div>
				<div @click="addInputColumn()" v-if="inputData.addColumn === true" class="sazi-calc__input-column-add mobile">{{inputData.strAddBtn}}</div>
			</div>
		</transition>
		</div>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			inputData: null,
			columns: [],
			layer: 1,
			show: true,
			savedColumns: {layer: {}},
			scrolling: false,
			timerEnter: null,
		}
	},
	computed: {
		fields() {
			return this.inputData.fields;
		},
		methodCode() {
			return this.inputData.code;
		},
		columnName: function () {
			if (this.inputData.columnName !== undefined) {
				return this.inputData.columnName;
			}
			return false;
		},

	},
	methods: {
		getNewColumn() {
			let column = [];
			this.fields.forEach(item => {
				let value = "";
				if (item.type=="counter")
					value = 1;
				column.push({name: item.name, code: item.code, value: value, type: item.type, trigger: item.trigger, requare: item.requare})
			})
			return column;
		},

		addInputColumn() {
			this.columns.push(this.getNewColumn());
			this.savedColumns[this.methodCode] = this.columns;
		},

		test() {
			let fields = [];
			for (let i = 0; i < this.inputs.fields.length; i++) {
				fields[i] = "1";
				this.columns.push({data: fields, mult: 1});
			}
		},

		checkZero(e, input, params) {
			input.value = Math.max(1, e);
			this.checkResult(params);
		},

		delColumn(index) {
			this.columns.splice(index, 1);
			this.checkResult();
		},

		checkResult(params) {
			let columnResult = [];
			var send = true;
			var i = 0
			this.columns.forEach(column => {
				if (this.checkColumn(column)) {
					columnResult.push(column);
				}
				else if (params !== undefined && params.keyColumn == 1) {
					send = false;
				}
				i++;
			})
			if (columnResult.length > 0 && send) {
				this.sendResult(columnResult, params)
			}
		},

		checkColumn(column) {
			let result = false;
			let requare = column.filter(item => item.requare == true && (item.value === "" || item.value === undefined || isNaN(item.value)));
			let trigger = column.filter(item => item.trigger == true && (item.value !== "" && item.value >= 0));
			if (requare.length == 0 && trigger.length > 0) {
				result = true;
			}
			return result;
		},

		getNormalizeColumn(column) {
			var result = {}
			column.forEach(item => {
				result[item.code] = item.value;
			})
			result['layer'] = this.layer;
			return result;
		},

		sumResult(result1, result2) {
			for (let key in result2) {
				if (result1[key] == undefined) {
					result1[key] = 0;
				}
				result1[key] += result2[key]
			}
		},

		reInit() {
			this.columns = [];
			this.layer = 1;
			this.savedColumns.layer[this.methodCode] = this.layer;
			this.addInputColumn();
		},

		sendResult(columns, params) {
			var result = {}
			columns.forEach(column => {
				let resultColumn = this.getNormalizeColumn(column);
				this.sumResult (result, this.inputData.formula(resultColumn));
			})
			this.$root.$emit('onDataResult', {results: result, layer: this.layer, inputSize: columns});
			if (params !== undefined && params.scroll !== false && !this.scrolling) {
				this.stopTimer();
				this.timerEnter = setTimeout(()=>{
					this.scrollToResult();
				}, 800);
			}
		}, 
		stopTimer(timer) {
			if (timer === undefined) {
				timer = this.timerEnter
			}
			clearTimeout(timer)
		},
		scrollToResult() {
			setTimeout(()=>{
				var resultMaterial = document.querySelector('#sazi-calc-result .sazi-calc__materials-item:first-child');
				var windowTop = window.pageYOffset
				if (windowTop + innerHeight < resultMaterial.offsetTop + 50) {
					var offset = innerHeight / 2.8
					this.$scrollTo('#sazi-calc-result', 1800, {
						easing: "ease", 
						cancelable: false, 
						offset: -offset,
						onStart: () => {
							this.scrolling = true;
						},
						onDone: () => {
							this.scrolling = false;
						}
					});
				}
			}, 200)
		}
	},
	created: function() {
		this.$root.$on("onSetMethod", data => {
			this.$root.$emit('onDataResult', {results: null});
			let timer = 300
			if (this.inputData) {
				this.show=false
			}
			else {
				timer = 0
			}
			this.inputData = data
			if (this.savedColumns[this.methodCode] !== undefined) {
				this.columns = this.savedColumns[this.methodCode];
				this.layer = this.savedColumns.layer[this.methodCode];
			}
			else {
				this.reInit();
			}
			setTimeout(()=>{
				this.show=true
				this.checkResult({scroll: false});
			}, timer)
		});

		this.$root.$on("onSelectedlayer", data => {
			if (this.layer != data) {
				this.layer = data;
				this.savedColumns.layer[this.methodCode] = data;
				this.checkResult({scroll: false});
			}
		});
		window.addEventListener('scroll', () => {
			this.stopTimer();
		})
	}
}
</script>

<style>

</style>
