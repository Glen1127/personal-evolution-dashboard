import { useState, useEffect } from 'react';
import { DashboardData } from '@/types';
import { storage } from '@/lib/storage';

export function useLocalStorage() {
    const [data, setData] = useState<DashboardData>(() => storage.get());

    useEffect(() => {
        storage.set(data);
    }, [data]);

    return [data, setData] as const;
}