// import { useContext, useState } from "react";
// import { MyContext } from "../context/MyContext";
// import Input from "./Input";

// const FileExplorer = ({ id = 1 }) => {
//   const { nodeData, deleteOperation } = useContext(MyContext);
//   const [showFolder, setShowFolder] = useState(false);
//   const [showInput, setShowInput] = useState(false);
//   const [showEditInput, setShowEditInput] = useState(false);

//   return (
//     <>
//       <div className="outer">
//         {
//           <h5 className="inner">
//             {(nodeData && nodeData[id] && nodeData[id])?.type == "folder"
//               ? "📁"
//               : "🗃️"}

//             <span
//               className={`${nodeData[id]?.type === "file" ? "filename" : ""}`}
//             >
//               {!showEditInput ? (
//                 <span onClick={() => setShowFolder(!showFolder)} type="button">
//                   {/* Content for when showEditInput is false */}
//                   {nodeData[id]?.name} {/* Display the name here */}
//                 </span>
//               ) : (
//                 showEditInput && ( // Make sure showEditInput is also true before rendering Input
//                   <Input
//                     showEditInput={showEditInput}
//                     name={nodeData[id].name}
//                     id={id}
//                   />
//                 )
//               )}
//               <span
//                 onClick={() => setShowInput(!showInput)}
//                 className="addNode"
//               >
//                 ➕
//               </span>
//               <span
//                 onClick={() => setShowEditInput(!showEditInput)}
//                 className="editNode"
//               >
//                 ✔️
//               </span>
//               <span className="" onClick={() => deleteOperation(id)}>
//                 {/* {we try to solve here edge case for root foldewr} */}
//                 {nodeData[id]?.parentId == null ? "" : "  ❌"}
//                 {}
//               </span>
//             </span>
//             {showInput && <Input setShowInput={setShowInput} showInput={showInput} />}
//           </h5>
//         }
//         {showFolder &&
//           nodeData[id]?.children?.map((childId, ind) => (
//             <>
//               <FileExplorer key={ind} id={childId} />
//             </>
//           ))}
//       </div>
//     </>
//   );
// };

// export default FileExplorer;

// import { useContext, useState, useEffect } from "react";
// import { MyContext } from "../context/MyContext";
// import Input from "./Input";

// const FileExplorer = ({ id = 1 }) => {
//   const { nodeData, deleteOperation } = useContext(MyContext);
//   const [showFolder, setShowFolder] = useState(false);
//   const [showInput, setShowInput] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const node = nodeData[id];
//   if (!node) return null; // Safeguard against undefined nodes

//   return (
//     <div className="outer">
//       <h5 className="inner">
//         {node.type === "folder" ? "📁" : "🗃️"}

//         <span className={node.type === "file" ? "filename" : ""}>
//           {!isEditing ? (
//             <span
//               onClick={() =>
//                 node.type === "folder" && setShowFolder(!showFolder)
//               }
//               className="filename"
//             >
//               {node.name}
//             </span>
//           ) : (
//             <input
//               type="text"
//               defaultValue={node.name}
//               className="editInput"
//               onBlur={() => setIsEditing(false)} // Save changes on blur
//             />
//           )}

//           <span onClick={() => setShowInput(!showInput)} className="addNode">
//             ➕
//           </span>

//           <span onClick={() => setIsEditing(!isEditing)} className="editNode">
//             {isEditing ? "✔️" : "✏️"}
//           </span>

//           {node.parentId !== null && (
//             <span onClick={() => deleteOperation(id)} className="deleteNode">
//               ❌
//             </span>
//           )}
//         </span>

//         {showInput && (
//           <Input
//             setShowInput={setShowInput}
//             showInput={showInput}
//             parentId={id}
//           />
//         )}
//       </h5>

//       {showFolder &&
//         node.children?.map((childId) => (
//           <FileExplorer key={childId} id={childId} />
//         ))}
//     </div>
//   );
// };

// export default FileExplorer;

import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import Input from "./Input";

const FileExplorer = ({ id = 1 }) => {
  const { nodeData, deleteOperation, addNode } = useContext(MyContext);
  const [showFolder, setShowFolder] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const node = nodeData[id];
  if (!node) return null;

  return (
    <div className="outer">
      <h5 className="inner">
        {/* Icon for folder or file */}
        <span className="icon">{node.type === "folder" ? "📁" : "🗃️"}</span>

        {/* Inline container for name and action buttons */}
        <span className="node-content">
          {/* Render inline editing input or the name */}
          {!isEditing ? (
            <span
              onClick={() =>
                node.type === "folder" && setShowFolder(!showFolder)
              }
              className="filename"
            >
              {node.name}
            </span>
          ) : (
            <input
              type="text"
              defaultValue={node.name}
              className="editInput"
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          )}

          {/* Button to add a node */}
          {nodeData[id]?.type === "folder" && (
            <span
              onClick={() => setShowAddInput(!showAddInput)}
              className="addNode"
            >
              ➕
            </span>
          )}
          {/* Button to toggle inline editing */}

          <span onClick={() => setIsEditing(!isEditing)} className="editNode">
            {isEditing ? "✔️" : "✏️"}
          </span>

          {/* Button to delete (only if not the root) */}
          {node.parentId !== null && (
            <span onClick={() => deleteOperation(id)} className="deleteNode">
              ❌
            </span>
          )}
        </span>
      </h5>

      {/* Add input appears below when adding a node */}
      {showAddInput && (
        <div className="addInputContainer">
          <Input
            setShowInput={setShowAddInput}
            showInput={showAddInput}
            id={id}
            submit={addNode}
          />
        </div>
      )}

      {/* Render children if the folder is toggled open */}
      {showFolder &&
        node.children?.map((childId) => (
          <FileExplorer key={childId} id={childId} />
        ))}
    </div>
  );
};

export default FileExplorer;
