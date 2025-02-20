import React from "react";
import { createContext, useState } from "react";
import data from "../data";
export const MyContext = createContext();

const FileContextWrapper = React.memo(({ children }) => {
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
      let currentId = nestedQueue.pop();
      if (nodeData[currentId].children) {
        nestedQueue.push(...nodeData[currentId].children);
      }
      // delete nodeData[currentId];
      delete updatedDataAfterDelete[currentId];
    }
    setNodeData(updatedDataAfterDelete);
  };

  // jo "id" aa rahi hai vah new node ka parent ban jayega
  const addNode = (parentId, value) => {
    console.log("add run");
    // check we create folder or file
    console.log(value);
    const isFolder = value?.split(".");
    const newId = new Date().getTime();

    const newData = {
      id: newId,
      name: value,
      type: `${isFolder.length > 1 ? "file" : "folder"}`,
      parentId: parentId,
      children: [],
    };
    const DataAfterAddingNewData = { ...nodeData, [newId]: newData };
    DataAfterAddingNewData[parentId]?.children.push(newId);
    // console.log(DataAfterAddingNewData);
    setNodeData(DataAfterAddingNewData);
  };

  const UpdateNode = (Ownid, value) => {
    console.log("update", Ownid, value);
    const updatedNodeData = {
      ...nodeData,
      // Update the specific item with Ownid
      [Ownid]: {
        ...nodeData[Ownid],
        name: value,
      },
    };
    if (nodeData[Ownid].type == "folder") {
      if (value.split(".")[1]) {
        console.log(
          "It is already folder then it does not support any '.' extension"
        );
        return;
      }
    } else {
      if (!value.split(".")[1]) {
        console.log("It is already file then it must have extension(.)");
        return;
      }
    }
    console.log(updatedNodeData);
    setNodeData(updatedNodeData);
  };

  return (
    <MyContext.Provider
      value={{ nodeData, deleteOperation, addNode, UpdateNode }}
    >
      {children}
    </MyContext.Provider>
  );
});

export default FileContextWrapper;
