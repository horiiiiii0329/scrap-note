import React, { useState, createContext } from "react";
import { ReactNode } from "react";
import { supabase } from "../../api";

export const AppWrapper = createContext({
  selectedContent: "",
  posts: [] as any,
  selectedTitle: "",
});

export const AppwrapperInnerContext = createContext({
  setSelectedTitle: (title: string) => {},
  fetchSelectedTitle: () => {},
  setActiveContent: (content: string) => {},
  fetchPosts: () => {},
});

export const AppWrapperProvider = ({ children }: { children: ReactNode }) => {
  const [activeContent, setActiveContent] = useState("Homepage");
  const [selectedTitle, setSelectedTitle] = useState("全て");
  const [posts, setPosts] = useState<string[] | null>([]);

  const titleSelectHandler = (title: string) => {
    setSelectedTitle(title);
  };

  const contentHandler = (content: string) => {
    setActiveContent(content);
  };

  async function fetchPosts() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("save")
      .select("*")
      .match({ title: selectedTitle })
      .filter("user_id", "eq", user?.id);

    setPosts(data);
  }

  const contextValue = {
    selectedContent: activeContent,
    posts,
    selectedTitle: selectedTitle,
  };

  const innerContextValue = {
    setSelectedTitle: titleSelectHandler,
    fetchSelectedTitle: fetchPosts,
    setActiveContent: contentHandler,
    fetchPosts,
  };

  return (
    <AppWrapper.Provider value={contextValue}>
      <AppwrapperInnerContext.Provider value={innerContextValue}>
        {children}
      </AppwrapperInnerContext.Provider>
    </AppWrapper.Provider>
  );
};
