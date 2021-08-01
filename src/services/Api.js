import client from './ClienteService'
import axios from 'axios';

const Api = {
    async flight () {
        const url = `api/v1/flights`;

        try {

            const sourceToken = axios.CancelToken.source();
            this.sourceRequest = sourceToken;


            const response = await client.get(url)
            this.sourceRequest = null;

            return response.data;
        } catch (error) {
            this.sourceRequest = null;

            throw error;
        }
    },
    async iataCodes () {
        const url = `api/v1/iataCodes`;

        try {
            const sourceToken = axios.CancelToken.source();
            this.sourceRequest = sourceToken;
            const response = await client.get(url)
            this.sourceRequest = null;

            return response.data;
        } catch (error) {
            this.sourceRequest = null;

            throw error;
        }
    },
    async hotels () {
        const url = `api/v1/hotels`;

        try {
            const sourceToken = axios.CancelToken.source();
            this.sourceRequest = sourceToken;
            const response = await client.get(url)
            this.sourceRequest = null;

            return response.data;
        } catch (error) {
            this.sourceRequest = null;

            throw error;
        }
    },
}

export default Api
