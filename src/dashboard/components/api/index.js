import axios from 'axios';
import { useState, useEffect } from 'react';
const url = 'http://localhost:5000/';

export function FetchCardsData() {
    const [data, setData] = useState({})

    useEffect(() => {

        fetch('/home')
        .then(res => res.json())
        .then(data => setData(data))
    }, [])

    return data;
}



export const FetchChartData = async () => {
    try {
        const {data} = await axios.get(`${url}/home`);
        
        return data;
  
    } catch (error) {
        
    }
}

export const FetchCrimeReport = async () => {
    const data = await fetch(`${url}crimereport`);
    const jsonData = data.json();


    return jsonData;
};


export const FetchSafeLifeReport = async () => {
    try {
        const data = await axios.get(`${url}/safe-life`);

        return data;
    } catch (error) {

    }
};


export const FetchLostItemReport = async () => {
    try {
        const data = await axios.get(`${url}/lostitem`);

        return data;
    } catch (error) {

    }
};


export const FetchFoundItemReport = async () => {
    try {
        const data = await axios.get(`${url}/founditem`);

        return data;
    } catch (error) {

    }
};


export const FetchCommunityServices = async () => {
    try {
        const data = await axios.get(`${url}/community-service`);

        return data;
    } catch (error) {

    }
};


export const FetchCertificatePermits = async () => {
    try {
        const data = await axios.get(`${url}/certificate-permt`);

        return data;
    } catch (error) {

    }
};
