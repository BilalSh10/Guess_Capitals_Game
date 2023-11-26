import * as itemsModel from "../model/ItemsModel.js";

let getItems = async (req, res) => {
  let allItems = await itemsModel.getItemsModel(req, res);
  res.status(200).json(allItems);
};

let postItem = (req, res) => {
    itemsModel.postItemModel(req, res);
    res.status(200).send("Added successfully");
};

let deleteItem = (req, res) => {
    itemsModel.deleteItemModel(req, res);
    res.status(200).send("Delete successfully");
};

export { getItems, postItem, deleteItem };
