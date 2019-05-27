
/*******************************************************************
  A troca de ambiente é realizada pelo comando MODE_ENV=ambiente
  no cmd antes de iniciar a aplicação.
********************************************************************/

const env = process.env.MODE_ENV || 'dev';
const config = () => {

//variaveis para diferentes ambientes: desenvolvimento, homologação e produção

  switch (env) {
    case 'dev':
      return {
        url: "**",
        token: "**",
        token_expires: 30
      }

    case 'hml':
      return{
        url: "**",
        token: "**",
        token_expires: 30 * 60 //30 MINUTOS
      }

    case 'prod':
      return{
        url: "**",
        token: "**",
        token_expires: 30
     }

  }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
