const net = require('net');

console.log('이름을 입력해주세요.');
process.stdin.once('data', data => {
    let name = data.toString().replace('\n', '');

    let socket = net.connect(5000, '192.168.1.150', () => {
        socket.on('data', data => {
            console.log(data.toString());
        });

        process.stdin.on('data', data => {
            let message = data.toString().replace('\n', '');
            let packet = `${name}|${message}`;
            socket.write(packet);
        });
    });
});