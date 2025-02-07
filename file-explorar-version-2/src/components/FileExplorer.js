// "use client";
// import React, { useContext, useState } from "react";

// import { MyContext } from "@/context/MyContext";
// import Input from "@/components/Input";

// const FileExplorer = ({ id = 1 }) => {
//   const { nodeData, deleteOperation, addNode, updateNode } =
//     useContext(MyContext);
//   const [showFolder, setShowFolder] = useState(false);
//   const [showAddInput, setShowAddInput] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const node = nodeData[id];
//   if (!node) return null;

//   return (
//     <div className="outer ">
//       <div className="node ">
//       <h5  onClick={() =>
//                 node.type === "folder" && setShowFolder(!showFolder)
//               } className="inner w-full ">
//         {/* Icon for folder or file */}
//         <span className="icon">{node.type === "folder" ? "📁" : "🗃️"}</span>

//         {/* Inline container for name and action buttons */}
//         <span className="node-content">
//           {/* Render inline editing input or the name */}
//           {!isEditing ? (
//             <span
//               // onClick={() =>
//               //   node.type === "folder" && setShowFolder(!showFolder)
//               // }
//               className="filename"
//             >
//               {node.name}
//             </span>
//           ) : (
//             // <input
//             //   type="text"
//             //   // defaultValue={node.name}
//             //   className="editInput"
//             //   // onBlur={() => setIsEditing(false)}
//             //   id={id}
//             //   name={node.name}
//             //   submit={updateNode} // ✅ Pass the correct update function
//             //   setShowEditInput={setIsEditing} // ✅ Close input after editing
//             //   ShowEditInput={isEditing}

//             // />

//             <Input
//               id={id}
//               name={node.name}
//               submit={updateNode}
//               setShowInput={setIsEditing} // ✅ Correct function to close input after editing
//               showInput={isEditing} // ✅ Renamed for consistency
//             />
//           )}

//           {/* Button to add a node */}
//           {nodeData[id]?.type === "folder" && (
//             <span
//               onClick={() => setShowAddInput(!showAddInput)}
//               className="addNode"
//             >
//               ➕
//             </span>
//           )}
//           {/* Button to toggle inline editing */}

//           <span onClick={() => setIsEditing(!isEditing)} className="editNode">
//             {isEditing ? "✔️" : "✏️"}
//           </span>

//           {/* Button to delete (only if not the root) */}
//           {node.parentId !== null && (
//             <span onClick={() => deleteOperation(id)} className="deleteNode">
//               ❌
//             </span>
//           )}
//         </span>
//       </h5>
//       </div>

//       {/* Add input appears below when adding a node */}
//       {showAddInput && (
//         <div className="addInputContainer">
//           <Input
//             setShowInput={setShowAddInput}
//             showInput={showAddInput}
//             id={id}
//             submit={addNode}
//           />
//         </div>
//       )}

//       {/* Render children if the folder is toggled open */}
//       {showFolder &&
//         node.children?.map((childId) => (
//           <FileExplorer key={childId} id={childId} />
//         ))}
//     </div>
//   );
// };

// export default FileExplorer;/
"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import { MyContext } from "@/context/MyContext";
import Input from "@/components/Input";

const FileExplorer = ({ id = 1, selectedId, setSelectedId, openFolders, setOpenFolders }) => {
  const { nodeData, deleteOperation, addNode, updateNode } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isAddInput, setIsAddInput] = useState(false);
  const contextMenuRef = useRef(null);

  const node = nodeData[id];
  if (!node) return null;

  const isFolderOpen = openFolders.includes(id);

  // Handle Right Click (Show Context Menu)
  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    setShowContextMenu(true);
  };

  const handleContextMenuClick = (e, action) => {
    e.stopPropagation(); // Prevent folder toggle
    setShowContextMenu(false);
    action();
  };

  // Handle Click on Folder (Select & Toggle Open/Close)
  const handleClick = () => {
    setSelectedId(id);
    if (node.type === "folder") {
      setOpenFolders((prev) =>
        prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      );
    }
    setShowContextMenu(false);
  };

  const handleAddNode = (parentId) => {
    setIsAddInput(true);
    if (!openFolders.includes(parentId)) {
      setOpenFolders((prev) => [...prev, parentId]); // Ensure parent folder stays open
    }
  };

  // Close Context Menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setShowContextMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="outer">
      <div
        className={`node w-full relative ${
          selectedId === id ? "bg-gray-700 text-white" : "hover:bg-gray-800"
        } rounded-md cursor-pointer flex items-center px-2 py-1`}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
      >
        
        <span className="icon text-blue-400">{node.type === "folder" ? "📁" : "🗃️"}</span>
        <span className="node-content ml-2">
          {!isEditing ? (
            <span className="filename">{node.name}</span>
          ) : (
            <Input
              id={id}
              name={node.name}
              submit={updateNode}
              setShowInput={setIsEditing}
              showInput={isEditing}
            />
          )}
        </span>

        {showContextMenu && (
          <div
          ref={contextMenuRef}
          className="absolute top-[-10%] right-[-20%] bg-[#2D2D30] text-[#CCCCCC] shadow-lg rounded-md py-1 min-w-36 border border-[#3E3E42] z-20 text-sm"
        >
          <button
            onClick={(e) => handleContextMenuClick(e, () => setIsEditing(true))}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Rename
          </button>
          <button
            onClick={(e) => handleContextMenuClick(e, () => deleteOperation(id))}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Delete
          </button>
          <button
            // onClick={(e) => handleContextMenuClick(e, () => setIsAddInput(true))}
            onClick={(e) => handleContextMenuClick(e, () => handleAddNode(id))}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Add
          </button>
          <button className="block w-full text-left px-4 py-2 text-gray-500 cursor-not-allowed">
            Copy
          </button>
          <button className="block w-full text-left px-4 py-2 text-gray-500 cursor-not-allowed">
            Open in integrated terminal
          </button>
        </div>
        )}
      </div>
      {isAddInput && (
       < div className="mt-2 ml-4">
       <Input 
        id={id}
        submit={addNode}
        setShowInput={setIsAddInput}
        showInput={isAddInput}
        /> 
        </div>
        )  
        }
      {/* Render child nodes (only if folder is open) */}
      {isFolderOpen &&
        node.children?.map((childId) => (
          <FileExplorer
            key={childId}
            id={childId}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            openFolders={openFolders}
            setOpenFolders={setOpenFolders}
          />
        ))}
    </div>
  );
};

const FileExplorerContainer = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [openFolders, setOpenFolders] = useState([]);

  return (
    <FileExplorer
      id={1}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      openFolders={openFolders}
      setOpenFolders={setOpenFolders}
    />
  );
};

export default FileExplorerContainer;
