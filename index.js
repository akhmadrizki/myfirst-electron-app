const electron = require("electron");

const {app, BrowserWindow, Menu, ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;
let aboutWindow;

app.on("ready", ()=> {
    todayWindow = new BrowserWindow({
       webPreferences: {
           nodeIntegration: true
       },
       title : "Aplikasi Pertamaku"
    });
    todayWindow.loadURL(`file://${__dirname}/index.html`);
    todayWindow.on("closed", ()=>{
        app.quit();
        todayWindow = null;
    });
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "All Appoitments"
    });
    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", ()=> (listWindow = null));
};

const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create Appoitments"
    });
    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", ()=> (createWindow = null));
};

const aboutWindowCreator = () => {
    aboutWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "About"
    });
    aboutWindow.setMenu(null);
    aboutWindow.loadURL(`file://${__dirname}/about.html`);
    aboutWindow.on("closed", ()=> (aboutWindow = null));
};

ipcMain.on("appointment:create", (event, appointment) => {
    console.log(appointment);
});

const menuTemplate = [{
    label: "File",
    submenu: [
        {
            label: "New Appoitments",
            click(){
                createWindowCreator();
            }
        },
        {
            label: "All Appoitments",
            click() {
                listWindowCreator();
            }
        },
        {
            label: "About",
            click() {
                aboutWindowCreator();
            }
        },
        {
            label: "Quit",
            accelerator: process.platform === "darwin" ? "Command+Q" : 
            "Ctrl + Q",
            click() {
                app.quit();
            }
        }
    ]
},
{
    label: "View",
    submenu: [{ role: "reload" }, { role: "toogledevtools" }]
}
]