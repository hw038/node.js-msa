

var a = function test(){
    console.log('A');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);