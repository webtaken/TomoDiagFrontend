//Verifico si mi usuario está o no loggeado

exports.handler = async (event, context) => {
    const guides = [
      { title: 'Enteoría aquí va lo de tomodiag', author: 'Yahaira' },
    ]
  
    // solo si hay propiedades del cliente (clientContext) retorno data
    // o sea si está loggeado
    if (context.clientContext.user) {
      // fetch data & then return
      return {
        statusCode: 200,
        body: JSON.stringify(guides)
      }
    }
    // Sino retorno error
    return {
      statusCode: 401,
      body: JSON.stringify({ mssg: 'Necesitas iniciar sesión ' })
    }
     
  }