import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const request = async (args) => {
    setLoading(true);
    try {
      const { data } = await axios(args);
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setError(err);

      return null;
    }
  };

  return {
    loading,
    request,
    error,
  };
};

export default useAxios;
