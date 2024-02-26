var aProd = [];
var aCliente = []
var username 
var password 

function dados() {
    var usr = 'admin';
    try {
        //Campos que irá trazer
        var fields = new Array("userProtheus","senhaProtheus");
        //Monta as constraints para consulta
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("userProtheus", usr, usr, ConstraintType.MUST));
            
        //Define os campos para ordenação
        var sortingFields = new Array("userProtheus");
            
        //Busca o dataset
        var dataset = DatasetFactory.getDataset("dsSenhaProtheus", fields, constraints, sortingFields);
        var count   = dataset.values.length;
        console.log(count)   
        
        if (count == 0) {
            console.log("Usuário não encontrado!");
        } else {    
            console.log("Cliente encontrado!");
            for (let i = 0; i < count; i++) {
                console.log("O usuário "+dataset.values[i].userProtheus)                
            }
            username = dataset.values[i].userProtheus
            password = dataset.values[i].senhaProtheus
        }
    } catch (e) {
        // TODO: handle exception
        console.log("ERRO: " + e);
        alert("ERRO: " + e);
    }
}

function makeAPICall() {

    dados()
    var base64Credentials = btoa(username + ':' + password);

    var codcliente = document.getElementById('codigoCliente').value
    console.log(validaCodigo(codcliente))
    // Configurando os detalhes da requisição
    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + base64Credentials
        },
    };
    if(codcliente.length == 6){
        // Fazendo a chamada para a API
        fetch('https://boleto.thcm.com.br:9696/rest/WSPROD/PRODUTO?codcliente='+codcliente, requestOptions)
            .then(response => response.json())
            .then(data => {
                var select = document.getElementById("produtos");
                while (select.options.length > 0) { 
                    select.remove(0);
                }
                while(aProd.length > 0){
                    aProd.pop();
                }
                if (data.ProdutoCliente.length > 1) {
                    if(data.ProdutoCliente.length >= 9){
                        select.setAttribute("size", 9);
                    }else{
                        select.setAttribute("size", data.ProdutoCliente.length);
                    }
                    document.getElementById('TitModal').innerHTML = 'O cliente '+data.ProdutoCliente[0].NomeCliente+' possui '+ data.ProdutoCliente.length +' lotes, selecione o lote que irá para o subjudice'
                    for (let i = 0; i < data.ProdutoCliente.length; i++) {
                        var option = new Option(data.ProdutoCliente[i].Produto, i.toString())
                        select.add(option);
                        let prodClient = {
                            NomeCliente: data.ProdutoCliente[i].NomeCliente,
                            CodFilial: data.ProdutoCliente[i].CodFilial,
                            RazaoFilial: data.ProdutoCliente[i].RazaoFilial,
                            Empreendimento: data.ProdutoCliente[i].Empreendimento,
                            Lote: data.ProdutoCliente[i].Lote,
                            Quadra: data.ProdutoCliente[i].Quadra
                        };
                        
                        // Adiciona o objeto do cliente ao array de clientes
                        aProd.push(prodClient);
                    }
                    abrirModal()
                    //alert("O cliente possui "+data.ProdutoCliente.length+" lotes:\n")
                }else{
                    if(data.ProdutoCliente.length>0){
                        document.getElementById('nomeCliente').value = data.ProdutoCliente[0].NomeCliente;
                        document.getElementById('codigoFilial').value = data.ProdutoCliente[0].CodFilial;
                        document.getElementById('razaoSocial').value = data.ProdutoCliente[0].RazaoFilial;
                        document.getElementById('empreendimento').value = data.ProdutoCliente[0].Empreendimento;
                        document.getElementById('lote').value = data.ProdutoCliente[0].Lote;
                        document.getElementById('quadra').value = data.ProdutoCliente[0].Quadra;
                    }else{
                        FLUIGC.message.alert({
                            message: 'O sistema realizou uma busca e não encontrou nenhum lote para este código de cliente.\n Verifique se o código está correto e tente novamente',
                            title: 'Nenhum lote encontrado',
                            label: 'OK'
                        },function(el, ev) {
                            //Callback action executed by the user...
                             
                            //el: Element (button) clicked...
                            //ev: Event triggered...
                             
                            
                        });
                    }
                    
                }
            })
            .then(data => console.log(data))
            .catch(error => {
                FLUIGC.message.alert({
                    message: 'O sistema realizou uma busca e não encontrou nenhum lote para este código de cliente.\n Verifique se o código está correto e tente novamente',
                    title: 'Nenhum cliente encontrado',
                    label: 'OK'
                },function(el, ev) {
                    //Callback action executed by the user...
                    
                    //el: Element (button) clicked...
                    //ev: Event triggered...
                    
                    
                });
                console.error('Aconteceu algum erro!', error)
            });
    }
}

function abrirModal(){
    var div = document.getElementById('janela-modal1')
    div.style.display = "flex";
}

function selecionaProduto() {
    var x = parseInt(document.getElementById("produtos").value);
    document.getElementById('nomeCliente').value = aProd[x].NomeCliente;
    document.getElementById('codigoFilial').value = aProd[x].CodFilial;
    document.getElementById('razaoSocial').value = aProd[x].RazaoFilial;
    document.getElementById('empreendimento').value = aProd[x].Empreendimento;
    document.getElementById('lote').value = aProd[x].Lote;
    document.getElementById('quadra').value = aProd[x].Quadra;
    var div = document.getElementById('janela-modal1')
    div.style.display = "none";
}

function cancelar() {
    var div = document.getElementById('janela-modal1')
    div.style.display = "none";
}

function makeAPICallCliente() {
    dados()
    var base64Credentials = btoa(username + ':' + password);
    //Apagando os valores ja colocado
    document.getElementById('codigoCliente').value = ''
    document.getElementById('codigoFilial').value = ''
    document.getElementById('razaoSocial').value = ''
    document.getElementById('empreendimento').value = ''
    document.getElementById('lote').value = ''
    document.getElementById('quadra').value = ''

    var nomeCliente = document.getElementById('nomeCliente').value;
    nomeCliente = nomeCliente.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    nomeCliente = nomeCliente.toUpperCase();
    
    var arrayName = nomeCliente.split(" ");
    console.log(arrayName);
    console.log(arrayName.length);
    var nome = "";
    var sobrenome = arrayName[arrayName.length-1]
    if (arrayName.length-1 <= 1) {
        nome = arrayName[0] + " "
    }else{
        for (let index = 0; index < arrayName.length-1; index++) {
            // console.log(arrayName[index])
            nome += arrayName[index] + " "
        }
    }
    
    if(arrayName.length>1){
        sobrenome = arrayName[arrayName.length-1]
    }else{
        sobrenome = " "
    }
    // Codificando o nome de usuário e senha em base64
    

    // Configurando os detalhes da requisição
    var requestOptions2 = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + base64Credentials
        },
    };
    if(nomeCliente.length > 3){
        // Fazendo a chamada para a API
        console.log(nome);
        console.log(sobrenome);
        fetch('https://boleto.thcm.com.br:9696/rest/WSPROD/NOME?prinome='+nome+'&sobrenome='+sobrenome, requestOptions2)
            .then(response => response.json())
            .then(data2 => {
                var select = document.getElementById("selcliente");
                console.log(data2)
                var n = select.options.length
                while(aCliente.length > 0){
                    aCliente.pop();
                }
                while(select.options.length > 0) {
                    select.options[0].remove();
                }
                console.log(select.options.length)
                if (data2.Cliente.length > 1) {
                    if(data2.Cliente.length >= 9){
                        select.setAttribute("size", 9);
                    }else{
                        select.setAttribute("size", data2.Cliente.length);
                    }
                    document.getElementById('TitModal2').innerHTML = 'Selecione o cliente desejado:'
                    for (let i = 0; i < data2.Cliente.length; i++) {
                        var option = new Option(data2.Cliente[i].CodCliente+' - '+data2.Cliente[i].NomeCliente, i.toString())
                        select.add(option);
                        let dadosCliente = {
                            NomeCliente: data2.Cliente[i].NomeCliente,
                            CodCliente: data2.Cliente[i].CodCliente
                        };
                        
                        // Adiciona o objeto do cliente ao array de clientes
                        aCliente.push(dadosCliente);
                    }
                    abrirModal2()
                    //alert("O cliente possui "+data2.ProdutoCliente.length+" lotes:\n")
                }else{
                    if(data2.Cliente.length > 0){
                        document.getElementById('nomeCliente').value = data2.Cliente[0].NomeCliente;
                        document.getElementById('codigoCliente').value = data2.Cliente[0].CodCliente;
                        makeAPICall()
                    }else{
                        FLUIGC.message.alert({
                            message: 'O cliente não foi encontrado. Verifique se o nome está corretamente escrito e tente novamente',
                            title: 'Cliente não encontrado',
                            label: 'OK'
                        });
                    }
                }
            })
            .then(data2 => console.log(data2))
            .catch(error => console.error('Aconteceu algum erro!', error));
    }
}
function abrirModal2(){
    var div = document.getElementById('janela-modal2')
    div.style.display = "flex";
}

function selecionaCliente() {
    var x = parseInt(document.getElementById("selcliente").value);
    document.getElementById('nomeCliente').value = aCliente[x].NomeCliente;
    document.getElementById('codigoCliente').value = aCliente[x].CodCliente; 
    makeAPICall()
    var div = document.getElementById('janela-modal2')
    div.style.display = "none";
    
}

function cancelar2() {
    var div = document.getElementById('janela-modal2')
    div.style.display = "none";
}