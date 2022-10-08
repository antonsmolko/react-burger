import { useEffect, useState } from 'react';
import { ANIMATION_TIME } from '../config';

const useMount = ({ isOpen }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen && !mounted) {
      setMounted(true);
    } else if (!isOpen && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [isOpen]);

  return { mounted };
};

export default useMount;
