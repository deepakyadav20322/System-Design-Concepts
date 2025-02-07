import FileExplorer from "@/components/FileExplorer";


export default function Home() {
  return (
   <div className="bg-[#201c14] text-white min-h-screen h-full flex">
    {/* sidebar */}
    <div className="max-w-[20rem] min-w-[15rem] auto border-r-[0.06rem] border-gray-400  min-h-screen p-4">
   <FileExplorer/>
   </div>
   {/* main content  */}
    <div className="p-4 bg-[#2e2d2d] w-full text-white">
    <h1 className="text-2xl font-bold">Welcome to the File Explorer</h1>
    <p className="text-lg">Click on the folder icon to expand the folder</p>

  </div>
   </div>
  );
}
