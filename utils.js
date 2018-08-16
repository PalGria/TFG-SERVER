let utils = {};
utils.createInsertQuery = (tabla, columnas, valores) => {
    //esta funcion creara una query con el siguiente formato dados los valores
    //INSERT INTO table_name (column1, column2, column3, ...)
    //VALUES (value1, value2, value3, ...);
    let query = `INSERT INTO ${tabla}`;
    let columnStr = '';
    let valuesStr = '';
    for (let i = 0; i < columnas.length; i++) {
        columnStr += columnas[i];
        valuesStr += `'${valores[i]}'`;
        if (i != columnas.length - 1) {
            columnStr += ', ';
            valuesStr += ', ';
        }
    }
    query += ` (${columnStr}) VALUES (${valuesStr});`;
    console.log(query);
    return query;
}
utils.createEditQuery = (tabla, id, columnas, valores) => {
    //esta funcion creara una query con el siguiente formato dados los valores
    //Update nombre_tabla Set columnas[i] = valores[i], columnas[i+1] = valores[i+1]
    //WHERE id = id
    let query = `UPDATE ${tabla} SET `;
    if (columnas.length == valores.length) {
        for (let i = 0; i < columnas.length; i++) {
            query += `${columnas[i]} = '${valores[i]}'`
            if (i != columnas.length - 1) { //si no es la ultima separamos coon coma
                query += ', ';
            }
        }
    }
    query += `WHERE id_juego = '${id}'`;
    console.log(query);
    return query;
}
module.exports = utils;