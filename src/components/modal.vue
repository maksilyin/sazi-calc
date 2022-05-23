<template>
	<div v-if="show">
		<div class="sazi-calc__overflow" ref="overflow">
			<div @click="close()" class="sazi-calc__modal-outer"></div>
			<div class="sazi-calc__modal-wrapper" :class="modal[modalCode].class">
				<transition name="slideDown">
				<div v-if="showModal" class="sazi-calc__modal">
					<span @click="close()" class="sazi-calc__modal-close">
						<svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="2.06066" y1="2.93934" x2="30.3449" y2="31.2236" stroke="#969696" stroke-width="3"/>
							<line x1="29.7169" y1="1.95153" x2="1.43264" y2="30.2358" stroke="#969696" stroke-width="3"/>
						</svg>
					</span>
					<div class="sazi-calc__modal-title" v-html="modal[modalCode].title"></div>
					<div class="sazi-calc__modal-image">
						<img v-if="modal[modalCode].img !== undefined" :src="'/img/calc/'+modal[modalCode].img">
					</div>
					<div class="sazi-calc__modal-text" v-html="modal[modalCode].text"></div>
				</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			modal:{
				stizD: {
					title: "Как определить, сколько слоев Стиз Д необходимо наносить?",
					img: "stizD-modal.jpg",
					text: '<p>Для обеспечения водо - и пароизоляционных свойств после отверждения состава на поверхности конструкции должна остаться сплошная видимая пленка Стиз Д.</p>'
								+'<p>Так как Стиз Д впитывается в поверхность стены и количество слоев нанесения зависит от пористости конструкции, мы рекомендуем придерживаться следующих вариантов:</p>'
								+'<p>• Для проемов, выполненных из <span class="bold">плотных минеральных материалов</span> (строительный кирпич, плотный бетон), достаточного одного слоя нанесения.</p>'
								+'<p>• Для <span class="bold">более пористых конструкций</span> (ячеистый бетон) требуется <span class="bold">два слоя</span> нанесения.</p>'
								+'<p class="mb-0">• На <span class="bold">самые высокопористые материалы</span> (легкий газобетон, минеральная вата) необходимо <span class="bold">три слоя</span> состава Стиз Д.</p>'
				},

				stizB_PU: {
					title: "Отличие Стиз В и Стиз PU",
					img: "stiz-B-PU-modal.png",
					text: '<p>Стиз В и Стиз PU используются для создания внутреннего пароизоляционного слоя монтажного шва. Отличия между ними следующие:</p>'
								+'<h3>Стиз В</h3>'
								+'<p>Это акрилатный однокомпонентный герметик, <span class="bold">готовый к нанесению</span>. Его отверждение происходит за счет испарения воды из массы герметика. Это означает, что <span class="bold">при повышенной влажности</span> (например, при проведении штукатурных работ и недостаточной вентиляции на строительном объекте) поверхностная пленка <span class="bold">может образовываться достаточно долго</span>.</p>'
								+'<h3>Стиз PU</h3>'
								+'<p class="mb-0">Это <span class="bold">полиуретановый</span> двухкомпонентный герметик. Его полимеризация происходит за счет химической сшивки, поэтому влажность окружающего воздуха <span class="bold">не влияет на скорость</span> его отверждения. Так как герметик двухкомпонентный, перед началом работ <span class="bold">необходимо провести смешение</span> компонентов низкооборотистой дрелью - начнется процесс отверждения, и герметик останется жизнеспособным в течение 6 часов.</p>'
				},

				fz_tz: {
					title: "Что такое фронтальный и торцевой монтажные зазоры?",
					img: "tz-fz-modal.jpg",
					text: '<p>Под размером <span class="bold">фронтального зазора</span> монтажного шва понимают расстояние между стеной и оконным блоком, которое видно с наружной стороны окна (с улицы).</p>'
							+'<p>Под размером <span class="bold">торцевого зазора</span> монтажного шва понимают расстояние между стеной и оконным блоком, которое видно с внутренней стороны окна (изнутри помещения).</p>'
							+'<p class="mb-0">Если окно установлено в проеме <span class="bold">без «четверти»</span>, то фронтальный и торцевой монтажные зазоры имеют одинаковый размер.</p>'
				},
				sendFormSuccess: {
					title: "Заявка отправлена",
					text: '<p style="text-align: center">Мы свяжемся с вами в ближайшее время</p>',
					class: 'sazi-calc__modal-wrapper--center'
				}
			},
			show: false,
			showModal: false,
			modalCode: null
		}
	},
	methods: {
		close() {
			this.$refs.overflow.style.backround = "transparent";
			this.showModal = false;
			setTimeout(() => {
				this.show = false
				this.$refs.overflow.removeAttribute('style');
			},300)
		}
	},
	mounted: function() {
		this.$root.$on("showModal", data => {
			this.modalCode = data;
			this.show = true;
			setTimeout(()=>{this.showModal=true})
		})
	}
}
</script>

<style lang="sass" scopet>
	.teleporter 
		display: block !important
		visibility: visible !important
</style>


