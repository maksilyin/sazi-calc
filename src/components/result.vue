<template>
<transition name="fade">
	<div id="sazi-calc-result" v-if="results !== null">
		<div class="sazi-calc__section">
			<h3>Требуемое количество материалов:</h3>
			<div class="sazi-calc__result-wrapper">
				<div v-for="(item, itemKey) in items" :key="'item'+itemKey" class="sazi-calc__result-item" :class="item.class">
					<div class="sazi-calc__result-title" v-html="item.title"></div>
					<div class="sazi-calc__materials">
						<div v-for="(material, key) in item.materials"
							:key="'material'+key" class="sazi-calc__materials-item"
							:class="[{'mr-materials-item': (item.materials.length > 1 && item.materials.length-1 != key) || material.hint !== undefined}]">
							<div :class="material.code" class="sazi-calc__materials-count">
								<number-result :number="results[material.code]"></number-result>
							</div>
							<div class="sazi-calc__materials-img">
								<img :src="'/img/calc/'+material.img">
							</div>
							<span
								v-if="material.hint !== undefined"
								@click="$root.$emit('showModal', material.hint)"
								class="hint">
							</span>
							<div v-if="key > 0" class="block-or">ИЛИ</div>
						</div>
						<div class="sazi-calc__materials-descr">
							<div v-if="item.descr !== undefined" v-html="item.descr"></div>
							<div v-if="item.layers !== undefined" class="sazi-calc__materials-layer">
								<div>{{item.layers.descr}}</div>
								<div class="sazi-calc__materials-layer-items">
									<div v-for="layer in item.layers.values"
									:key="'layer'+layer"
									:class="{active: selectedLayer == layer}"
									@click="setLayer(layer)"
									class="sazi-calc__materials-layer-item" >{{layer}}</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="item.bottomHint !== undefined"
						@click="$root.$emit('showModal', item.bottomHint.hint)"
						class="sazi-calc__materials-bottom-hint">
						{{item.bottomHint.descr}}
					</div>
				</div>
			</div>
		</div>
		<div class="sazi-calc__info-section">
			<div @click="infoOpen=!infoOpen" class="sazi-calc__info-title">
				<span>Информация об упаковках по каждому продукту</span>
				<span v-show="infoOpen" class="sazi-calc__info-close"></span>
				<span v-show="!infoOpen" class="sazi-calc__info-open"></span>
			</div>
			<transition name="slide">
				<div v-if="infoOpen" class="sazi-calc__info-lists">
					<div class="sazi-calc__info-list">
						<div class="sazi-calc__info-list-title">Стиз А:</div>
						<ul>
						<li>картуш 0,44 кг (310 мл);</li>
						<li>файл-пакет 0,9 кг (600 мл);</li>
						<li>пластиковое ведро 3 кг;</li>
						<li>пластиковое ведро 7 кг</li>
						</ul>
					</div>
					<div class="sazi-calc__info-list">
						<div class="sazi-calc__info-list-title">Стиз B:</div>
						<ul>
						<li>файл-пакет 0,9 кг (600 мл);</li>
						<li>пластиковое ведро 3 кг;</li>
						<li>пластиковое ведро 7 кг</li>
						</ul>
					</div>
					<div class="sazi-calc__info-list">
						<div class="sazi-calc__info-list-title">Стиз PU:</div>
						<ul>
						<li>комплект 6,6 кг (компонент<br> А - 6 кг; компонент В - 0,6 кг)</li>
						</ul>
					</div>
					<div class="sazi-calc__info-list">
						<div class="sazi-calc__info-list-title">Стиз Д:</div>
						<ul>
						<li>пластиковое ведро 3 кг</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<last-step></last-step>
	</div>
</transition>
</template>

<script>
import lastStep from "./lastStep.vue"
import numberResult from "./numberResult.vue"
export default {
	components: {
		lastStep, numberResult
	},
	data() {
		return {
			items: [
				{
					title: "Для внешней<br> гидроизоляции:",
					class: "stizA",
					materials: [
						{code: "stizA", img: "stiz_a_7kg.png"}
					]
				},
				{
					title: "Для внутренней<br> пароизоляции:",
					class: "stizB-PU",
					materials: [
						{code: "stizB",  img: "stiz_b_7kg.png"},
						{code: "stizPU",  img: "stiz_pu_7kg.png"}
					],
					bottomHint: {
						hint: "stizB_PU",
						descr: "В чем разница и какой материал выбрать?"
					}
				},
				{
					title: "Для примыкания оконных<br> блоков к стеновым проемам:",
					class: "stizD",
					materials: [
						{code: "stizD", hint: "stizD",  img: "stiz_d_7kg.png"}
					],
					descr: 'Расход Стиз Д указан исходя из<br> покрытия в <span class="bold">один</span> слой. Количество<br> слоев зависит от пористости материала стены. Чем более пористые материалы – тем больше слоев.',
					layers: {
						descr: "Укажите нужное количество слоев:",
						values: [1, 2, 3]
					}
				}
			],
			selectedLayer: 1,
			infoOpen: false,
			results: null,
      		listHeight: false,
		}
	},
	methods: {
		setLayer(layer) {
			this.selectedLayer = layer;
			this.$root.$emit('onSelectedlayer', layer);
		},
	},
	mounted: function() {
		this.$root.$on("onDataResult", data => {
			this.results = data.results;
			if (data.layer !== undefined)
				this.selectedLayer = data.layer;
			else 
				this.selectedLayer = 1
		});
	}
}
</script>
