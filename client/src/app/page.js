'use client';
import { CiCirclePlus } from "react-icons/ci";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  
  const [itemText, setItemText] = useState("")
  const [itemList, setItemList] = useState([])
  const [whenToRefresh, setWhenToRefresh] = useState(true)

  useEffect(() => {  
    console.log(itemList);
    let getData = async () => {
      let itemsData = await axios.get('http://localhost:3001/items');
      setItemList(itemsData.data);
    }
    getData();
  }, [whenToRefresh]);


  let createItem = async () => {
    if(itemText.length !== 0) {
      try{
        await axios.post('http://localhost:3001/item', {newItem: itemText});
        setWhenToRefresh(!whenToRefresh);
      }catch(err){
        console.log("Error in Creating an item", err);
      }
    }
  }

  let textChange = (e) => {
    setItemText(e.target.value);
  }

  const handleCheckboxChange = async (e) => {
    let id = e.target.id;
    try{
      await axios.delete(`http://localhost:3001/item/${id}`);
      setWhenToRefresh(!whenToRefresh);
    }catch(err){
      console.log("Client Error in Deleting an item", err);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-between">
      <h1 className="mt-8 p-4 pl-32 pr-32 shadow-md bg-orange-300 rounded-md">
        Today
      </h1>
      <div
        id="List"
        className="mt-8 p-4 pr-36 shadow-md bg-slate-100 rounded-md flex flex-col"
      >
      {itemList && itemList.map((singleItem) => {
        return(
          <React.Fragment key={singleItem.id}>
            <div id="item" className="flex flex-row items-center gap-5 mb-3">
              <input type="checkbox" id={singleItem.id} name="deleteInput" onChange={handleCheckboxChange}/>
              <p className="pr-4 text-black">{singleItem.name}</p>
              <input className="hidden w-32 pl-2 text-black bg-slate-100" type="text" placeholder={singleItem.name} />
            </div>
            <span className="bg-slate-300 h-[1.5px] w-full mb-3"></span>
          </React.Fragment>
        )
      })}
      </div>

      <div className=" bg-slate-100 shadow-sm rounded-lg mt-2 p-3 flex flex-row gap-4">
        <input
          className="border border-black rounded-sm p-1 pl-3"
          type="text"
          placeholder="New Item"
          value={itemText}
          autoFocus
          onChange={textChange}
          name="newItem"
        ></input>
        <button onClick={createItem}>
          <CiCirclePlus size={30}/>
        </button>
      </div>
    </div>
  );
}
