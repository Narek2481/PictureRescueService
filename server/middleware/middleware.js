import express from "express";
import path from "path";
import cors from "cors";
function middleware(app) {
    app.use(express.static(path.resolve("../img")));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
}
export default middleware;