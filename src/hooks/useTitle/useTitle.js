import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Project Name - ${title}`;
  }, [title]);
};

export default useTitle;
