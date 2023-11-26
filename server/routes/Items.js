import express from "express";
import * as itemControllers from "../controller/Items.js";
const router = express.Router();

router.get("/items", itemControllers.getItems);
router.post("/item", itemControllers.postItem);
router.delete("/item/:id", itemControllers.deleteItem);

export default router;
