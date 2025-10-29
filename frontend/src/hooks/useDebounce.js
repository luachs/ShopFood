import { useState, useEffect } from "react";

import React from "react";

const useDebounce = (value, delay = 500) => {
  const [deBouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, [delay]);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return deBouncedValue;
};

export default useDebounce;
