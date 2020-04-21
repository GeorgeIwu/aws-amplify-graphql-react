import React, {useEffect, useState} from 'react';

const LoadingWrapper = ({ loading, error, children }) => {
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error]);

  return (
    <div>
      {loading
        ? <div>Loader processing</div>
        : showError ? <div>error</div> : children}
    </div>
  );
};

export default LoadingWrapper;


