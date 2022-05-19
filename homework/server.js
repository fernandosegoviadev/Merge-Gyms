const express = require('express');
const morgan = require('morgan');

const app = express();

//_______Criterio comercial_________________
// indice: va de uno a cien
// es un índice compueto
// y corresponde a una ubicación en la capana de Gauss
// tanto para el usuario entre 2000 usuarios
// como para el gimasio entre 100 gimnasios
// luego calculo la distancia con el módulo y ordeno

//_______Criterio marketing_________________
// plan: 'golden', 'premium', 'estandar'
// visibilidad: 50%, 30%, 20% (probabilidades)

//_______Criterio funcional_________________
// ubicación: { x: valueX, y: valueY }
// luego calculo de distancia con pitagoras
// necesito la ubicación de la persona y ordeno

// Simulo la base de datos con los avatars (pers 1, 2, 3 y 4) y los gyms

const avatar = [{id: 1, name: 'pers1', location: {x: 2, y: 4}, index: 30 },
{id: 2, name: 'pers2', location: {x: 5, y: 1}, index: 50 },
{id: 3, name: 'pers3', location: {x: 2, y: 3}, index: 70 },
{id: 4, name: 'pers3', location: {x: 0, y: 4}, index: 90 }]

const gyms = [
  {id: 1, name: 'Gym1', location: { x: 1 , y: 3 }, plan: 'golden', index: 12},
  {id: 2, name: 'Gym2', location: { x: 2 , y: 3 }, plan: 'golden', index: 15},
  {id: 3, name: 'Gym3', location: { x: 3 , y: 4 }, plan: 'premium', index: 45},
  {id: 4, name: 'Gym4', location: { x: 4 , y: 2 }, plan: 'premium', index: 66},
  {id: 5, name: 'Gym5', location: { x: 5 , y: 1 }, plan: 'premium', index: 77},
  {id: 6, name: 'Gym6', location: { x: 6 , y: 1 }, plan: 'premium', index: 39},
  {id: 7, name: 'Gym7', location: { x: 2 , y: 8 }, plan: 'estandar', index: 47},
  {id: 8, name: 'Gym8', location: { x: 3 , y: 5 }, plan: 'estandar', index: 50},
  {id: 9, name: 'Gym9', location: { x: 4 , y: 3 }, plan: 'estandar', index: 60},
  {id: 10, name: 'Gym10', location: { x: 5 , y: 4 }, plan: 'estandar', index: 70},
  {id: 11, name: 'Gym11', location: { x: 3 , y: 3 }, plan: 'estandar', index: 85},
  {id: 12, name: 'Gym12', location: { x: 2 , y: 3 }, plan: 'estandar', index: 95}  
]

// Necesito el arreglo principal
// Orden: comercial - marketing - funcional - comercial - marketing - funcional - etc.
// tiene el mismo largo que la cantidad de gyms (12 elementos)
// No puedo repetir info (cada gym aparece una sola vez)
let mainArr = {};

// El arreglo comercial - por cercania indice las campanas
let comercialArr =  [];

// El arreglo de marketing - por plan de visualización contratado por el cada gym
let marketingArr = [];

// El arreglo funcional - por cercania geográfica
let functionalArr = [];


function sortByIndex (indexUser) {
  // Llega como un numero, ejemplo: 30

  // el me llega 30 y tengo dos num cerca: 45 y 25
  // necesito calcular la distancia y ordenarlos en base a ella
  // | 30 - 25 | = 5    (distancia)
  // | 30 - 45 | = 15   (distancia)
  let gyms4 = [...gyms];

  for (let i = 0 ; i < gyms4.length; i++ ) {

    let indexGym = gyms4[i].index;
    // ejemplo index: 12
    // tengo 12 y 30, y necesito la distancia
    
    // La función Math.abs() retorna el valor absoluto de un número dado.
    // Va a transformar el resultado simpre a positivo si el num 
    // es distinto de 0, y si es cero es igual a cero.

    gyms4[i].proximity = Math.abs(indexGym - indexUser);

    
  }

  comercialArr = gyms4.sort(function (a, b) {
    if (a.proximity > b.proximity) {
      return 1;
    }
    if (a.proximity < b.proximity) {
      return -1;
    }
    
    return 0;
  });

  console.log('----------------- ORDENAMIENTO POR CERCANÍA EN EL PERFIL ----------------------')
  console.log(comercialArr, 'como quedó comercialArr al final')
  console.log('---------------------------------------------------------------------')
  // Va a faltar el orden por módulo, por distancia
}

function sortByPlan () {
  // No necesita recibir argumentos

  // Acá tiene que estar reflejada la probabilidad para el ordenamiento
  // Y el azar
  // debería asignar a cada uno de los gyms un valor que refleje 
  // el azar y la probabilidad de visualización y luego hacer el ordenamiento

  let probability;
  let gyms2 = [...gyms];

  for (let i = 0 ; i < gyms2.length; i++ ) {
    if (gyms2[i].plan === 'estandar') probability = 0.2
    if (gyms2[i].plan === 'premium') probability = 0.3
    if (gyms2[i].plan === 'golden') probability = 0.5

    gyms2[i].indexPlan = Math.random()*probability;
  }

  marketingArr = gyms2.sort(function (a, b) {
    if (a.indexPlan > b.indexPlan) {
      return -1;
    }
    if (a.indexPlan < b.indexPlan) {
      return 1;
    }    
    return 0;
  });

  // for (let i = 0 ; i < gyms2.length; i++ ) {  
  //   delete gyms2[i].indexPlan
  // }

  console.log('----------------- ORDENAMIENTO PLAN DE VISUALIZACIÓN ----------------------')
  console.log(marketingArr, 'como quedó marketingArr al final')
  console.log('---------------------------------------------------------------------')
  // Esto debería estar
}

function sortByLocation (location) {
  // Llega como un objeto, ejemplo: {x: 2, y: 4}

  // Hay que ver donde está el avatar y donde está el gym y calcular distancia
  // Agregar una referencia dentro de cada objeto y luego hacer el ordenamiento
  // por último tendría que eliminar esa propiedad
  
  // Cálculo de distancia en ejes cartesiano d^2 = (x2-x1)^2 + (y2-y1)^2
  // d = √((x2-x1)^2 + (y2-y1)^2)

  // La función Math.sqrt() devuelve la raíz cuadrada de un número.
  // La función Math.pow() devuelve el valor de un número elevado a otro número.
  // console.log(location, ' qué llega a la función')

  let gyms3 = [...gyms];

  const { x, y } = location;

  for (let i = 0 ; i < gyms3.length; i++ ) {
    let x1 = gyms3[i].location.x;
    let y1 = gyms3[i].location.y;

    // console.log( x1, y1, ' cómo llegan las coordenadas del gym')

    // La función Math.abs() retorna el valor absoluto de un número dado.
    // La función  Math.pow() devuelve la  base elevada al exponente 
    // Math.pow(base, exponente)

    let resulX =  Math.pow(Math.abs(x - x1), 2); // elelevo la diferencia al cuadrado
    // console.log(resulX);
    let resulY = Math.pow(Math.abs(y - y1), 2);
    // console.log(resulY);
    let resul = resulX + resulY; // aplico raíz cuadrada a la suma
    // de los cuadrados
    
    // console.log(resul, ' el resultado qué onda' )
    resul = Math.sqrt(resul);

    gyms3[i].distanceKm = resul;

    // gyms3[i].distance = Math.sqrt( Math.sqrt(x - x1) + Math.sqrt(y - y1) )

    
  }

  // console.log(gyms3, ' cómo quedó el tema de la distancia');

  functionalArr = gyms3.sort(function (a, b) {
    if (a.distanceKm > b.distanceKm) {
      return 1;
    }
    if (a.distanceKm < b.distanceKm) {
      return -1;
    }    
    return 0;
  });

  // for (let i = 0 ; i < gyms3.length; i++ ) {  
  //   delete gyms3[i].distance
  // }
  console.log('----------------- ORDENAMIENTO POR DISTANCIA EN KM ----------------------')
  console.log(functionalArr, ' cómo quedó al final functionalArr');
  console.log('---------------------------------------------------------------------')

}

function mergeArr () {
  // No necesita recibir argumentos

  if (comercialArr.length === 12 && marketingArr.length === 12 && functionalArr.length === 12) {
    // En este caso hago el merge
    // Suponiendo que los arreglos anteriores se puedieron logar
    // ahora debería hacer un merge sin repetir resultados
    // con lo cual mi mainArr debe terminar con la misma cantidad de 
    // gimansios que elementos (12 y no más)

    // console.log(comercialArr, marketingArr, functionalArr);

    // const mergeNumber = 2;

    // esto podría ser otra función
    // mainArr = comercialArr.concat(marketingArr.concat(functionalArr));
    // console.log(mainArr, ' cómo quedó cocatenado');
    // Supongamos

    // comercialArr = [ {id: 3, name: 'gym3'}, {id: 2, name: 'gym2'},
    //  {id: 4, name: 'gym3'},{id: 5, name: 'gym5'},{id: 7, name: 'gym7'},
    //  {id: 1, name: 'gym1'} ];

    // marketingArr = [ {id: 1, name: 'gym1'},
    //  {id: 4, name: 'gym3'},{id: 5, name: 'gym5'},{id: 7, name: 'gym7'},
    //  {id: 3, name: 'gym3'}, {id: 2, name: 'gym2'} ];

    // marketingArr = [ {id: 4, name: 'gym3'},{id: 5, name: 'gym5'},
    //  {id: 7, name: 'gym7'}, {id: 1, name: 'gym1'}, {id: 3, name: 'gym3'}, 
    // {id: 2, name: 'gym2'} ];
    
    // Parace no ser necesario el segundo for, sin embargo es necesario 
    // para asegurarme de ir agregando un elemento de cada cola de forma
    // sucesiva, si no estuviera, se vería afectado el orden de prioridad

    for ( var i = 0 ; i < 4 ; i++ ) {
      // Por cada vuelta se agregan 3 pares key-value
      // para tener 12 necesito 4 vueltas

      // Recorro los tres arrays a la vez
      // existe la propiedad ID N ?      
      // Si no existe creala y asignale tal valor
      // Si ya existe evaluá el siguiente caso
      // {ID 6: 'obj6', ID 3: 'obj3', ID 2: 'obj2'}

      //-------------------------------------------------------------------

      if(mainArr[ `ID ${comercialArr[i].id}` ] ) { 
        // Si ya existe, evaluá el siguiente caso
        for (let j = i ; j < comercialArr.length ; j++ ) {

          // Cuando no la tengas crealá y cortá
          if (!mainArr[ `ID ${comercialArr[j].id}` ]) {

            mainArr[ `ID ${comercialArr[j].id}` ] = comercialArr[j] ;

            break;
          }          
        }
      }
      if(!mainArr[ `ID ${comercialArr[i].id}` ] ) { // Si no existe, creala
        mainArr[ `ID ${comercialArr[i].id}` ] = comercialArr[i] ;
        // mainArr = {
        // ID 3: {id: 3, name: 'gym3'}
        // }
      }

      //-------------------------------------------------------------------

      if(mainArr[ `ID ${marketingArr[i].id}` ]) { 
        // Si ya existe, evaluá el siguiente caso, y el siguiente, y el siguiente
        // hasta que crees una nueva propiedad
        for (let j = i ; j < marketingArr.length ; j++ ) {
          // Cuando no la tengas crealá y cortá
          if (!mainArr[ `ID ${marketingArr[j].id}` ]) {

            mainArr[ `ID ${marketingArr[j].id}` ] = marketingArr[j] ;

            break;
          }
        }
      }
      if (!mainArr[ `ID ${marketingArr[i].id}` ]) {
        mainArr[ `ID ${marketingArr[i].id}` ] = marketingArr[i] ;
        // mainArr = {
        // ID 3: {id: 3, name: 'gym3'},
        // ID 1: {id: 1, name: 'gym1'}
        // }
      }

      //-------------------------------------------------------------------

      if(mainArr[ `ID ${functionalArr[i].id}` ]) { 
        // Si ya existe, evaluá el siguiente caso
        for (let j = i ; j < functionalArr.length ; j++ ) {
          // Cuando no la tengas crealá y cortá
          if (!mainArr[ `ID ${functionalArr[j].id}` ]) {

            mainArr[ `ID ${functionalArr[j].id}` ] = functionalArr[j] ;

            break;
          }
        }
      }
      if (!mainArr[ `ID ${functionalArr[i].id}` ]) {
        mainArr[ `ID ${functionalArr[i].id}` ] = functionalArr[i]
        // mainArr = {
        // ID 3: {id: 3, name: 'gym3'},
        // ID 1: {id: 1, name: 'gym1'}
        // ID 4: {id: 4, name: 'gym3'}
        // }
      }

      //-------------------------------------------------------------------
      // Al final espero tener un objeto con doce pares key-value
      // que no estén repetidos y respeten los criterios de prioridad

    }

    // let mainObj = mainArr;

    console.log(mainArr, ' cómo quedó el "array" principal')
    console.log('---------------------------------------------------------------------')

    // Falta la parte más dificil, hacer el merge sin que se repitan

  }

}



app.use(morgan('dev'));


// const avatar = [{id: 1, name: 'pers1', location: {x: 2, y: 4}, index: 30 },
// {id: 2, name: 'pers2', location: {x: 5, y: 1}, index: 50 },
// {id: 3, name: 'pers3', location: {x: 5, y: 1}, index: 70 },
// {id: 4, name: 'pers3', location: {x: 5, y: 1}, index: 90 }]

app.get('/gyms', (req, res) => {
  // Este get va a recibir un objeto que va a aportar info del avatar y la ubicación
  // { id: 1 } si recibo eso uso lo guardado en const pers1 y así...
  // tengo id 1, 2, 3, 4
  
  const { id } = req.query; // id del avatar
 
  // console.log(id);
    
  if (id) {
    Number(id);

    let data = avatar[id-1];
    // en data tengo el id, el name, la location y el index del avatar
    // ej {id: 1, name: 'pers1', location: {x: 2, y: 4}, index: 30 }

    sortByIndex(data.index);

    sortByPlan();

    sortByLocation(data.location);

    mergeArr();

  }
  
  // console.log (mainArr, ' se pudo lograr el ansiado merge???');
  
  // Acá va a llamar a una función que va a devolver un array ordenado
  // y ese array va a ser diferente según el avatar elegido
  
  // Si tengo el merge en el array.... =)
  
  res.send('Está haciendo un get a /')
});

app.post('/gyms', (req, res) => {
  
  // console.log(req.query);

  res.send('Está haciendo un post a /')
})



// app.get('/', (req, res) => {
//   res.send(`
//     <h1>Bienvenidos a Henry!</h1>
//     ${req.cookies.userId ? `
//       <a href='/home'>Perfil</a>
//       <form method='post' action='/logout'>
//         <button>Salir</button>
//       </form>
//       ` : `
//       <a href='/login'>Ingresar</a>
//       <a href='/register'>Registrarse</a>
//       `}
//   `)
// });










app.listen(3000, (err) => {
  if(err) {
   console.log(err);
 } else {
   console.log('Listening on localhost:3000');
 }
});
