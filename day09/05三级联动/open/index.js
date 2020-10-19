const {
    exec
} = require('child_process');

function open(url) {
    //需要判断此电脑时是什么的
    const platForm = process.platform;
    let cmd = "";

    switch (platForm) {
        case 'win32':
            cmd = "start "; //window
            break;
        case 'darwin': //,macos
            cmd = "open ";
            break;
        case 'linux':
            cmd = "xdg-open "; //linux
            break;
    }
    //执行这个命令
    exec(cmd + url);
}

module.exports = open;