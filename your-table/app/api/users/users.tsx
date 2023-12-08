import mysql from "mysql2/promise";
const executeQuery = async (query : any, data : any) => {
    try {
        const db = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            database: 'stoliki',
            user: 'root',
            password: '123456',
        })
        const [ result ] = await db.execute(query, data);
        await db.end();
        console.log(result);
        return result;
    } catch (error : any) {
        console.log(error);
        return new Error(error);
    }
};

export default executeQuery;