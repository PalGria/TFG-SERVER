let utils = {};
utils.createInsertQuery = (tabla, columnas, valores) => {
    //esta funcion creara una query con el siguiente formato dados los valores
    //INSERT INTO table_name (column1, column2, column3, ...)
    //VALUES (value1, value2, value3, ...);
    let query = `INSERT INTO ${tabla}`;
    let columnStr = '';
    let valuesStr = ''; 
    for (let i = 0; i < columnas.length; i++ ){
        columnStr += columnas[i];
        valuesStr += `'${valores[i]}'`;
        if(i != columnas.length -1){
            columnStr += ', ';
            valuesStr += ', ';
        }
    }
    query += ` (${columnStr}) VALUES (${valuesStr});`;
    console.log(query);
    return query;
}

module.exports = utils;