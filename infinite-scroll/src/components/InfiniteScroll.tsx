import React, { useEffect, useRef, useState, useCallback } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import PostCard from "./PostCard";
import { IPostCard } from "../types";

const InfiniteScroll: React.FC = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<IPostCard[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=6`
      );
      const data: IPostCard[] = await response.json();
      setList((prev) => [...prev, ...data]);
      setPageNo((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNo]);

  const listLastNodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchData();
          }
        },
        { threshold: 0.75 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, fetchData]
  );

  useEffect(() => {
    fetchData();
  }, []);


  // List  me height number me hono chahiye isliye ham dynamically height calculate kar rahe hai and we set it into List.
  useEffect(() => {
    // Calculate height dynamically
    const updateHeight = () => {
      setContainerHeight(window.innerHeight - 20);
    };
  
    updateHeight(); // Set initial height
    window.addEventListener("resize", updateHeight);
  
    return () => window.removeEventListener("resize", updateHeight);
  }, []);





  // React-Window Row Renderer(har ek row kaisa hona chahiye vo yaha se difine hoga...)
  const Row = ({ index, style }: ListChildComponentProps) => {
    if (index === list.length - 1) {
      return (
        <div ref={listLastNodeRef} style={style} key={list[index].id}>
          <PostCard postCardData={list[index]} />
        </div>
      );
    }
    return (
      <div style={style} key={list[index].id}>
        <PostCard postCardData={list[index]} />
      </div>
    );
  };

  return (
   
    <div className="border border-red-300 h-[calc(100vh-80px)] overflow-hidden">
       
      <List
      height={containerHeight}
      // height={600}
      itemCount={list.length}
      itemSize={300}
      width="100%"
      >
      {Row}
      </List>
      {loading && (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
      )}
    </div>

  );
};

export default InfiniteScroll;
