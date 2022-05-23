<template>
    <div class="sazi-calc__section no-border">
        <h3>Выберите способ расчета:</h3>
        <div class="sazi-calc__buttons-wrapper">
            <button @click="setInputData(0)" class="sazi-calc__btn" :class="{active: selected==0}">По размеру одного или нескольких окон</button>
            <button @click="setInputData(1)" class="sazi-calc__btn" :class="{active: selected==1}">По погонным метрам монтажного шва</button>
            <button @click="setInputData(2)" class="sazi-calc__btn" :class="{active: selected==2}">По общей площади остекления</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputData: [
                {
                    code: "windows",
                    name: "По размеру одного или нескольких окон",
                    fields: [
                        { name: "Ширина окна, мм", code: "width", requare: true},
                        { name: "Высота окна, мм", code: "height", requare: true},
                        { name: "Фронтальный монтажный зазор, мм", code: "fz", hint: "fz_tz", trigger: true},
                        { name: "Торцевой монтажный зазор, мм", code: "tz", hint: "fz_tz", trigger: true},
                        { name: "Количество окон данного размера", code: "count", type: "counter"},
                    ],
                    addColumn: true,
                    strAddBtn: "Добавить окно +",
                    columnName: "Окно",
                    formula: function (fields) {
                        return {
                            stizA: ((fields.fz > 0) ? (1500*4.5/1000*(fields.fz/1000+3/1000)*(2*fields.height/1000+ 2*fields.width/1000)*fields.count) : 0),
                            stizB: ((fields.tz > 0) ? (1500*4.5/1000*(fields.tz/1000+3/1000)*(2*fields.height/1000+ 2*fields.width/1000)*fields.count) : 0),
                            stizPU: ((fields.tz > 0) ? (1700*2/1000*(fields.tz/1000+3/1000)*(2*fields.height/1000+ 2*fields.width/1000)*fields.count) : 0),
                            stizD: (25/1000*(2*fields.height/1000+2*fields.width/1000)*fields.layer)
                        }
                    }
                },

                {
                    code: "montage",
                    name: "По погонным метрам монтажного шва",
                    fields: [
                        { name: "Общая длина монтажного шва, м.п.", code: "length", requare: true},
                        { name: "Фронтальный монтажный зазор, мм", code: "fz", hint: "fz_tz", trigger: true},
                        { name: "Торцевой монтажный зазор, мм", code: "tz", hint: "fz_tz", trigger: true},
                    ],
                    formula: function (fields) {
                        return {
                            stizA: ((fields.fz > 0) ? (1500*4.5/1000*(fields.fz/1000+3/1000)*fields.length) : 0),
                            stizB: ((fields.tz > 0) ? (1500*4.5/1000*(fields.tz/1000+3/1000)*fields.length) : 0),
                            stizPU: ((fields.tz > 0) ? (1700*2/1000*(fields.tz/1000+3/1000)*fields.length) : 0),
                            stizD: (25/1000*fields.layer*fields.length)
                        }
                    }
                },

                {
                    code: "glazing",
                    name: "По общей площади остекления",
                    fields: [
                        { name: "Общая площадь остекления, м2", code: "square", requare: true},
                        { name: "Фронтальный монтажный зазор, мм", code: "fz", hint: "fz_tz", trigger: true},
                        { name: "Торцевой монтажный зазор, мм", code: "tz", hint: "fz_tz", trigger: true},
                    ],
                    formula: function (fields) {
                        return {
                            stizA: ((fields.fz > 0) ? (1500*4.5/1000*(fields.fz/1000+3/1000)*(2+2)*fields.square) : 0),
                            stizB: ((fields.tz > 0) ? (1500*4.5/1000*(fields.tz/1000+3/1000)*(2+2)*fields.square) : 0),
                            stizPU: ((fields.tz > 0) ? (1700*2/1000*(fields.tz/1000+3/1000)*(2+2)*fields.square) : 0),
                            stizD: (25/1000*(2+2)*fields.layer*fields.square)
                        }
                    }
                },
            ],
            selected: null,
        }
    },
    methods: {
        setInputData(type) {
            if (this.selected != type) {
                this.$root.$emit('onSetMethod', this.inputData[type])
                this.selected = type;
            }
        }
    },
}
</script>

<style lang="sass" scoped>
    @media screen and (max-width: 942px) 
        .sazi-calc__btn
            

</style>