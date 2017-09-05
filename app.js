// 启动命令： forever --minUptime 10000 --spinSleepTime 26000 start
var spawn = require('child_process').spawn;
free = spawn('hexo', ['server', '-p 4000']);

free.stdout.on('data', function (data) {
    console.log('standard output:\n' + data);
});

free.stderr.on('data', function (data) {
    console.log('standard error output:\n' + data);
});

free.on('exit', function (code, signal) {
    console.log('child process eixt ,exit:' + code);
});