import { useEffect } from 'react';

export const useOnMount = effect => {
  useEffect(effect, []);
};
