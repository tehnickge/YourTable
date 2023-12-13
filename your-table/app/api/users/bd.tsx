import mysql from "mysql2/promise";
const executeQuery = async (query : any, data : any) => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        })
        const [ result ] = await db.execute(query, data);
        await db.end();
        //console.log(result);
        return result;
    } catch (error : any) {
        console.log(error);
        return new Error(error);
    }
};

export default executeQuery;