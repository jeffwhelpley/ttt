"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3002;
const fragmentPath = '/__wf/vanilla-fragment';
// Serve static files from the public directory at the fragment path
app.use(fragmentPath, express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.listen(port, () => {
    console.log(`Vanilla JS fragment running at http://localhost:${port}`);
});
