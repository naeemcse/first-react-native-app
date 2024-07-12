
import { Alert } from "react-native";
import { useEffect, useState } from "react";

interface UseAppwriteProps {
    fn: () => Promise<any>;
}

interface UseAppwriteResponse {
    data: any[];
    loading: boolean;
    refetch: () => void;
}

const useAppwrite = ({ fn }:UseAppwriteProps|any):UseAppwriteResponse => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fn();
            setData(res);
        } catch (error:any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, loading, refetch };
}

export default useAppwrite;