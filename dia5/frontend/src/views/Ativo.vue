<template>
  <div class="bicicletas">
    <h1>Ativos</h1>
    <b-navbar toggleable="lg" type="dark" variant="info" />
    <b-navbar-brand href="Ativo.vue">Ativo</b-navbar-brand>
    <b-navbar-brand href="#">Carteira</b-navbar-brand>
    <b-navbar-brand href="#">Performance</b-navbar-brand>
  
    <hr />
    <b-button v-b-modal.criaAtivo>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
    </b-button>
    <b-table striped hover :items="ativo" :fields="fields">
        <template slot="cell(ativo)" slot-scope="{ item: { ativo }}">
            <font-awesome-icon
                :icon="ativo === 'Y' ? 'check' : 'times'"
            />
        </template>
        <template slot="cell(actionDelete)" slot-scope="{ item: { codigo }}">
            <b-button v-on:click="excluirAtivo(codigo)">
                <font-awesome-icon icon="trash" />
            </b-button>
        </template>
        <template slot="cell(actionEdit)" slot-scope="{ item }">
            <b-button v-on:click="beforeEditaAtivo(item)">
                <font-awesome-icon icon="pen" />
            </b-button>
        </template>
    </b-table>
    <b-modal id="criaAtivo"
        title="Novo Ativo"
        ok-title="Salvar"
        cancel-title="Cancelar"
        @show="beforeEditaAtivo"
        @ok="saveNovaAtivo">
        <formBicicleta v-model="ativoAtual"/>
    </b-modal>
    <b-modal id="editaBicicleta"
        :title="'Alterar a Ativo - ' + ativoAtual.codigo"
        ok-title="Alterar"
        cancel-title="Cancelar"
        @ok="editarAtivo">
        <formBicicleta v-model="ativoAtual"/>
    </b-modal>
  </div>
</template>


<script>
import formBicicleta from '../components/formBicicleta' // não consegui mudar para formAtivo, tava dando um erro não consegui resolver
import axios from 'axios'
export default {

  components:{formBicicleta},
  data:() => { 
    return {
      ativoAtual:{
        codigo:'',
        ativo:'',
        isNew:false
      },
      ativo: [],
      fields: [
        {
          key:'descricao',
          label:'Descrição',
        },
        {
          key:'codigo',
          label:'Ativo'
        },
        {
          key:'actionDelete',
          label:''
        },
        {
          key:'actionEdit',
          label:''
        }
      ]
    }
  },
  methods: {
        excluirAtivo() {
            return this.ativo.splice(0,1);
        },
        beforeEditaAtivo(ativo) {
            this.ativoAtual = {
                codigo: ativo.codigo,
                descricao: ativo.descricao,
                isNew: true
            }
            this.$root.$emit('bv::show::modal', 'editaBicicleta');
        },

        async editarAtivo() {
           let payload = {
                descricao: this.ativoAtual.descricao
            };

            try {
                await axios.put(`http://localhost:3000/ativo/${this.ativoAtual.codigo}`, payload);
                await this.carregaAtivo();
            } catch(err) {
                alert('erro ao atualizar a bicicleta');
            }
        },
        async carregaAtivo() {
            this.ativo.splice(0, this.ativo.length);
            let dados = await axios.get('http://localhost:3000/ativo/');
            this.ativo.push(...dados.data);
        },
        beforeNovaAtivo() {
            this.ativoAtual.codigo = '';
            this.ativoAtual.descricao = 'Y';
            this.ativoAtual.isNew = true;
        },
        async saveNovaAtivo() {
            let payload = {
                codigo: this.ativoAtual.codigo,
                descricao: this.ativoAtual.descricao
            };

            try {
                await axios.post('http://localhost:3000/ativo/', payload);
                await this.carregaAtivo();
            } catch(err) {
                alert('erro ao inserir a bicicleta');
            }
        }
    },
    async mounted() {
        await this.carregaAtivo();
    }
}
</script>