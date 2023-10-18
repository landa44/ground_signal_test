import { useRef, useMemo, useEffect } from "react";
import { debounce } from "lodash";

const useDebounce = (callback) => {
  // creating ref
  const ref = useRef();

  useEffect(() => {
    // updating ref when occur a change
    ref.current = callback;
  }, [callback]);

  // creating debounced callback only once - on mount
  const debouncedCallback = useMemo(() => {
    // func will be created only once - on mount
    const func = () => {
      // ref.current is a reference to the latest callback since is update in the useEffect
      ref.current?.();
    };

    return debounce(func, 500);

    // no dependencies! never gets updated
  }, []);

  return debouncedCallback;
};

export default useDebounce;
