
import React , { useEffect, useRef, useState, useCallback } from "react";
import PostCard from "./PostCard";
import { IPostCard } from "../types";

const InfiniteScroll = () => {
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<IPostCard[]>([]);

  // here we define the type present and future both because it change into different conditions
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchData =useCallback( async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=6`
      );
      console.log(pageNo)
      const data = await response.json();
      console.log(data);
      setList((prev) => [...prev, ...data]);
      setPageNo((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  },[pageNo])

  // implement intrensic observer
  const listLastNodeRef = useCallback(
    (node: any) => {
        if(loading) return
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchData();
          }
        },
        { threshold: 1 }
      );

      if (node) observer.current.observe(node);
    },
    [loading,fetchData]
  );

  useEffect(() => {
    fetchData();
    console.log("page rerender")
  }, []);

  return (
    <>
      {list.map((postCardData, ind) => {
        if (list.length == ind + 1) {
          return (
            <div ref={listLastNodeRef} key={postCardData.url} >
              <PostCard postCardData={postCardData} />
            </div>
          );
        } else {
          return <PostCard key={postCardData.id+ind+""} postCardData={postCardData} />;
        }
      })}
    </>
  );
};

export default InfiniteScroll;
