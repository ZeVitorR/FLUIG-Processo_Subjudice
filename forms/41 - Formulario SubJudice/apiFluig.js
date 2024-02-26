var dataPC1 = ''
var dataPC2 = ''
function historicoProcesso(idProcesso) {
    var historic = ''
    // Configurando os detalhes da requisição
    var requestOptions = {
        method: 'GET',
    };
    
    // Fazendo a chamada para a API
    fetch('https://thomasie156267.fluig.cloudtotvs.com.br/process-management/api/v2/requests/'+idProcesso+'/histories', requestOptions)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.items.length; i++) {
                dataFormatada(data.items[i].date);
                if(dataPC2 == '' || dataPC2 == null){
                    dataPC2 = dataPC1;
                }
                if(data.items[i].type == 'OBSERVATION'){
                    historic += '<p>'+dataFormatada(data.items[i].date)+' - '+data.items[i].user.name+' comentou na atividade: '+data.items[i].observationDescription+' </p>'
                }else{
                    if(data.items[i].movementSequence == 1){
                        historic += '<p>'+dataFormatada(data.items[i].date)+' - '+data.items[i].user.name+' iniciou a solicitação '+data.items[i].processInstanceId+'</p>'
                    }else{
                        if(data.items[i].user.name != 'System:Auto'){
                            if( dataPC2 == dataPC1){
                                if(i == 1){
                                    historic += '<p>'+dataFormatada(data.items[i].date)+' - '+data.items[i].user.name+' movimentou atividade '+data.items[i].targetState.stateName+' para a atividade '+data.items[i].state.stateName+'</p>'
                                }else{
                                    historic += '<p>'+dataFormatada(data.items[i].date)+' - '+data.items[i].user.name+' movimentou atividade '+data.items[i].targetState.stateName+' para a atividade '+data.items[i].state.stateName+'</p>'
                                }
                            }else{
                                historic += '<hr>'
                                if(i == 1){
                                    historic += '<p>'+dataFormatada(data.items[i].date)+' - '+data.items[i].user.name+' movimentou atividade '+data.items[i].targetState.stateName+' para a atividade '+data.items[i].state.stateName+'</p>'
                                }else{
                                    historic += '<p>'+dataFormatada(data.items[i].date)+' - '+data.items[i].user.name+' movimentou atividade '+data.items[i].targetState.stateName+' para a atividade '+data.items[i].state.stateName+'</p>'
                                }
                                dataPC2 = dataPC1;
                            }
                            
                        }
                        
                    }
                }
                var element = document.getElementById('hist');
                element.innerHTML = historic        
            }
        })
        .catch(error => {
            FLUIGC.message.alert({
                message: 'Não foi possivel realizar a consulta do historico ->'+error,
                title: 'erro',
                label: 'OK'
            },function(el, ev) {
                //Callback action executed by the user...
                
                //el: Element (button) clicked...
                //ev: Event triggered...
                
                
            });
            console.error('Aconteceu algum erro!', error)
        });
    
}

function dataFormatada( data ){
    let text = data;
    const myArray = text.split("-", 3);
    const a     = myArray[2].split("T"), 
          day   = a [0], 
          month   = myArray[1],
          year    = myArray[0],
          hour    = a[1].split(".",1)
    dataPC1 = day+'/'+month+'/'+year
    return day+'/'+month+'/'+year+" "+hour
}
