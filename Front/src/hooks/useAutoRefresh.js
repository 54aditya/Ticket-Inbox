import { useEffect } from "react";

export default function useAutoRefresh(callback, delay = 10000) {
  useEffect(() => {
    const i = setInterval(callback, delay);
    return () => clearInterval(i);
  }, [callback]);
}
