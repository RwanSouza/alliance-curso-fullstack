<template>
    <b-form>
        <b-form-group
            id="input-codigo"
            label="Adicionar"
            label-for="txtCodigo"
            description="Descrição"
            :disabled="!content.isNew"
        >
            <b-form-input
                id="txtCodigo"
                v-model="content.codigo"
                type="text"
                required
                placeholder="Codigo do ativo"
                @input="handleInput"
                :disabled="!content.isNew"/>

                <b-form-input
                id="txtCodigo"
                v-model="content.descricao"
                type="text"
                required
                placeholder="Descriçao"
                @input="handleInput"
                :disabled="!content.isNew"/>
        </b-form-group>
        <b-form-group
            id="input-ativo"
            label="Ativo"
            label-for="chkAtivo"
        >
            <b-form-checkbox
                id="chkAtivo"
                v-model="content.ativo"
                required
                switch
                @input="handleInput"/>
        </b-form-group>
    </b-form>
</template>

<script>
export default {
    props: ['value'],
    data () {
        return {
            content: {
                codigo: this.value.codigo,
                ativo: (this.value.ativo ==='Y'),
                isNew: this.value.isNew
            }

        }
    },
    methods: {
        handleInput () {
            let retorno = {
                codigo: this.content.codigo,
            };
            this.$emit('input', retorno);
        }
    }
}
</script>