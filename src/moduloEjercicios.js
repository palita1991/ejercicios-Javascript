import basededatos from './basededatos.js';


/**
* Devuelve el promedio de anios de estreno de todas las peliculas de la base de datos.
*/
export const promedioAnioEstreno = () => {
    let sumaAnios=0;
    basededatos.peliculas.map((p) => sumaAnios+=p.anio);
    return (sumaAnios/basededatos.peliculas.length);
};

/**
* Devuelve la lista de peliculas con promedio de critica mayor al numero que llega
* por parametro.
* @param {number} promedio
  */
export const pelicuasConCriticaPromedioMayorA = (promedio) => {
    let peliculasCriticas = [];

    basededatos.peliculas.map((p)=>{
        let sumaPelicula = 0;
        let calificaciones = basededatos.calificaciones.filter((c) => c.pelicula === p.id).map(cali => sumaPelicula+=cali.puntuacion);

        if((sumaPelicula/calificaciones.length)>promedio){
            peliculasCriticas.push(p)
        }
    })
    return peliculasCriticas;
};

/**
* Devuelve la lista de peliculas de un director
* @param {string} nombreDirector
*/
export const peliculasDeUnDirector = (nombreDirector) => {
    let director = basededatos.directores.find((d) => d.nombre === nombreDirector);
    let peliculasDirector=[];

    basededatos.peliculas.map((p)=>{
        if(p.directores.includes(director.id)){
            peliculasDirector.push(p)
        }
    })
    return peliculasDirector;
};

/**
* Devuelve el promdedio de critica segun el id de la pelicula.
* @param {number} peliculaId
*/
export const promedioDeCriticaBypeliculaId = (peliculaId) => {
    let suma = 0;
    let calificaciones = basededatos.calificaciones.filter((c) => {c.pelicula === peliculaId}).map((p) => {suma+=p.puntuacion})
    return (suma/calificaciones.length);
};

/**
 * Obtiene la lista de peliculas con alguna critica con
 * puntuacion excelente (critica >= 9).
 * En caso de no existir el criticas que cumplan, devolver un array vacio [].
 * Ejemplo del formato del resultado: 
 *  [
        {
            id: 1,
            nombre: 'Back to the Future',
            anio: 1985,
            direccionSetFilmacion: {
                calle: 'Av. Siempre viva',
                numero: 2043,
                pais: 'Colombia',
            },
            directores: [1],
            generos: [1, 2, 6]
        },
        {
            id: 2,
            nombre: 'Matrix',
            anio: 1999,
            direccionSetFilmacion: {
                calle: 'Av. Roca',
                numero: 3023,
                pais: 'Argentina'
            },
            directores: [2, 3],
            generos: [1, 2]
        },
    ],
 */
export const obtenerPeliculasConPuntuacionExcelente = () => {
    let peliculasExcelentes=[];

    basededatos.peliculas.map((p)=>{
        let sumaPelicula = 0;
        let calificaciones = basededatos.calificaciones.filter((c) => c.pelicula === p.id).map(cali => sumaPelicula+=cali.puntuacion);

        if((sumaPelicula/calificaciones.length)>=9){
            peliculasExcelentes.push(p)
        }
    })

    return peliculasExcelentes;
};

/**
 * Devuelve informacion ampliada sobre una pelicula.
 * Si no existe la pelicula con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto pelicula,
 * agregar la lista de criticas recibidas, junto con los datos del critico y su pais.
 * Tambien agrega informacion de los directores y generos a los que pertenece.
 * Ejemplo de formato del resultado para 'Indiana Jones y los cazadores del arca perdida':
 * {
            id: 3,
            nombre: 'Indiana Jones y los cazadores del arca perdida',
            anio: 2012,
            direccionSetFilmacion: {
                calle: 'Av. Roca',
                numero: 3023,
                pais: 'Camboya'
            },
            directores: [
                { id: 5, nombre: 'Steven Spielberg' },
                { id: 6, nombre: 'George Lucas' },
            ],
            generos: [
                { id: 2, nombre: 'Accion' },
                { id: 6, nombre: 'Aventura' },
            ],
            criticas: [
                { critico: 
                    { 
                        id: 3, 
                        nombre: 'Suzana Mendez',
                        edad: 33,
                        pais: 'Argentina'
                    }, 
                    puntuacion: 5 
                },
                { critico: 
                    { 
                        id: 2, 
                        nombre: 'Alina Robles',
                        edad: 21,
                        pais: 'Argentina'
                    }, 
                    puntuacion: 7
                },
            ]
        },
 * @param {string} nombrePelicula
 */
export const expandirInformacionPelicula = (nombrePelicula) => {
    let pelicula = basededatos.peliculas.find((p) => p.nombre === nombrePelicula);
    let directores = [];
    let generos= [];
    let criticas= [];

    pelicula.directores.map(d => {
        directores.push(basededatos.directores.find(director => director.id === d))
    })
    
    pelicula.generos.map(g => {
        generos.push(basededatos.generos.find(genero => genero.id === g))
    })

    basededatos.calificaciones.filter(c => c.pelicula === pelicula.id).map(c => {
        criticas.push(basededatos.criticos.find(critico => critico.id === c.critico))
    })

    pelicula.directores=directores;
    pelicula.generos=generos;
    pelicula.criticas=criticas;
    return pelicula;
};
