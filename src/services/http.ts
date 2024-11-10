import axios from "axios";

export const http = axios.create({
    baseURL: "/api/recipes",
    headers: {
        "Content-type": "application/json",
    }
});
