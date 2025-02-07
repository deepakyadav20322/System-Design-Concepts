"use client"
import { createContext, useState } from "react";
import data from '@/data'
export const MyContext = createContext();

const FileContextWrapper = ({ children }) => {
  const [nodeData, setNodeData] = useState(data);


  const deleteOperation = (id) => {
    const updatedDataAfterDelete = { ...nodeData }; // initilly initalize with previous data
    const parentId = updatedDataAfterDelete[id]?.parentId; // here we are try to get parent of deleted item
    if (updatedDataAfterDelete[parentId]) {
      //check if parentId exist
      updatedDataAfterDelete[parentId].children = updatedDataAfterDelete[
        parentId
      ].children?.filter((childId) => childId !== id); // here we remove the deleted id item from it's parent chaildren
    }
    // Now we nestedly remove all the related data of that id
    const nestedQueue = [id]; // initially we put the current deleted id
    while (nestedQueue.length > 0) {
      let currentId = nestedQueue.shift();
      if (nodeData[currentId].children) {
        nestedQueue.push(...nodeData[currentId].children);
      }
      delete nodeData[currentId];
      setNodeData(updatedDataAfterDelete);
    }
  };

   const updateNode = (id, value) => {
    const updatedDataAfterUpdate = { ...nodeData };
    updatedDataAfterUpdate[id].name = value;
    setNodeData(updatedDataAfterUpdate);
  }


  const addNode = (parentId, value) => {
    console.log("add run");
    // check we create folder or file
    console.log(value);
    const isFolder = value?.split(".");
    const newId = new Date().getTime();

    const newData = {
      id: newId,
      name: value,
      type: `${isFolder?.length > 1 ? "file" : "folder"}`,
      parentId: parentId,
      children: [],
    };
    const DataAfterAddingNewData = { ...nodeData, [newId]: newData };
    DataAfterAddingNewData[parentId]?.children.unshift(newId);
    console.log(DataAfterAddingNewData);
    setNodeData(DataAfterAddingNewData);
  };

  return (
    <MyContext.Provider value={{ nodeData,updateNode, deleteOperation, addNode }}>
      {children}
    </MyContext.Provider>
  );
};

export default FileContextWrapper;
