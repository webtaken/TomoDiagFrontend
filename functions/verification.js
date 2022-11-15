// para tener acceso limitado a los usuarios
exports.handler = async (event, context) => {
    console.log('function ran')
  
    //respuesta 
    const data = { name: 'Yahaira', age: 35, job: 'empresauria' } 
  
    // retorno respuesta al browser
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }