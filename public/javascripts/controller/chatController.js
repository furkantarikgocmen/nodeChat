app.controller('chatController' , ['$scope', ($scope) => {
    const socket = io.connect('http://localhost:3000');
    //socket.emit('Selam');
    //indexController ile aynı sorun var.
    //hw reposunda socket klasöründeki index.html ile sayfayı açtığım zaman logluyor ama bunda loglamıyor.
}])