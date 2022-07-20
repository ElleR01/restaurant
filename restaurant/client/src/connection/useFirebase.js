import { useCallback, useState } from "react"
//firebase connector, is loading is true while the connection is up, haserror is up while connection has problems
const useFirebase = () => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const readFirebase = useCallback(async (url, config = {}) => {
        try {
            setIsLoading(true);
            setHasError(false);
            const response = await fetch(url, config);
            const data = await response.json();
            setIsLoading(false);
            return (data);
        } catch (e) {
            setHasError(true);
            console.error(e);
        }
        setIsLoading(false);
    }, []);

    return {
        readFirebase,
        isLoading,
        hasError
    }
};

export default useFirebase;