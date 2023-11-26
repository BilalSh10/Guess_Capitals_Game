import pg from 'pg';
import 'dotenv/config'

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

db.connect();

const getItemsModel = async (req, res) => {
    try{
        let allItems = await db.query(process.env.GET_ITEMS_SQL_QUERY);
        return allItems.rows;
    }catch(err){
        console.log("Error in getting items: " + err);
    }
}

const postItemModel = async (req, res) => {
    let item = req.body.newItem;
    try{
        await db.query('INSERT INTO items (name) VALUES ($1);', [item]);
    }catch(err){
        console.log("Error in Creating items: " + err);
    }
}


const deleteItemModel = async (req, res) => {
    let itemID = req.params.id;
    console.log(itemID);
    try{
        await db.query('DELETE FROM items where id = $1;', [itemID]);
    }catch(err){
        console.log("Server Error in Deleting an item: " + err);
    }
}

export { getItemsModel, postItemModel, deleteItemModel};