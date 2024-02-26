$(document).ready(function(){
    var atividadeAtual;
    var input = document.querySelector("#valorProposta");
    var proposta = input.value;
    var valor1 = document.getElementById('radio-SetFav');
    console.log('o valor é'+valor1.value+"esse");
    console.log(proposta);
    // $('#empreendimento').select2();
    // dados();
    atividadeAtual = getWKNumState();
    if(atividadeAtual != 0){
        chamaHist()
    }
    if(atividadeAtual == "0"){
        $("#show6").hide(2000);
        $("#show8").hide(2000);
        $("#show16").hide(2000);
        $("#show39").hide(2000);       
        $("#showJur").hide(2000);
        $("#show390").hide(2000);       
        $("#show391").hide(2000);       
        $("#show392").hide(2000);       
        $("#show393").hide(2000);       
    }else if(atividadeAtual == "5"){
        $("#show6").hide();
        $("#show8").hide();
        $("#show16").hide();
        $("#show39").hide();       
        $("#show390").hide();       
        $("#showJur").hide();
        $("#show391").hide();       
        $("#show392").hide();       
        $("#show393").hide();  
        $("#show6").show(2000);
    }else if(atividadeAtual == "6"){
        $("#show6").hide();
        $("#show8").hide();
        $("#show16").hide();
        $("#show39").hide();       
        $("#showJur").hide();
        $("#show390").hide();       
        $("#show391").hide();       
        $("#show392").hide();       
        $("#show393").hide();
        $("#show6").show();
        $("#show8").show(2000);
    }else if(atividadeAtual == "11" || atividadeAtual == "10" || atividadeAtual == "17"){
        $("#show6").hide();
        $("#show8").hide();
        $("#show16").hide();
        $("#show39").hide();       
        $("#show390").hide();       
        $("#showJur").hide();
        $("#show391").hide();       
        $("#show392").hide();       
        $("#show393").hide();
        $("#show6").show();
        $("#show8").show();
        $("#show16").show(2000);
        $("#showJur").show(2000);
        $("#showJur1").show(2000);
        $("#show39").show(2000);
        $("#show390").show(2000);
        $("#show391").show(2000);
        $("#show392").show(2000);
        $("#show393").show(2000);
    }else if(atividadeAtual == "15"){
        $("#show6").show();
        $("#show8").show();
        $("#show16").show();
        $("#show39").show();
        $("#showJur").show();
        $("#showJur1").show();
        $("#show390").show();
        $("#show391").show();
        $("#show392").show();
        $("#show393").show();
    }else if(atividadeAtual == "56"){

        $("#show6").hide();
        $("#show8").hide();
        $("#show16").hide();
        $("#show39").hide();       
        $("#show390").hide();       
        $("#showJur").hide();
        $("#showJur1").hide();
        $("#showJur2").hide();
        $("#show391").hide();       
        $("#show392").hide();       
        $("#show393").hide();
        $("#show6").show();
        $("#show8").show();
        $("#show16").show(2000);
        $("#show39").show(2000);
        $("#show390").show(2000);
        $("#showJur").show(2000);
        $("#showJur1").show(2000);
        $("#show391").show(2000);
        $("#show392").show(2000);
        $("#show393").show(2000);
    }else if(atividadeAtual == "61"){
        $("#show6").hide();
        $("#show8").hide();
        $("#show16").hide();
        $("#show39").hide();       
        $("#show390").hide();       
        $("#showJur").hide();
        $("#showJur1").hide();
        $("#showJur2").hide();
        $("#show391").hide();       
        $("#show392").hide();       
        $("#show393").hide();
        $("#show6").show();
        $("#show8").show();
        $("#show16").show(2000);
        $("#show39").show(2000);
        $("#show390").show(2000);
        $("#showJur").show(2000);
        $("#showJur1").show(2000);
        $("#showJur2").show(2000);
        $("#show391").show(2000);
        $("#show392").show(2000);
        $("#show393").show(2000);
    }
    else{
        $("#show6").hide();
        $("#show8").hide();
        $("#show16").hide();
        $("#show39").hide();       
        $("#show390").hide();       
        $("#showJur").hide();
        $("#show391").hide();       
        $("#show392").hide();       
        $("#show393").hide();
        $("#show6").show();
        $("#show8").show();
        $("#show39").show(2000);
        $("#show390").show(2000);
        $("#showJur").show(2000);
        $("#showJur1").show(2000);
        $("#showJur2").show(2000);
        $("#show391").show(2000);
        $("#show392").show(2000);
        $("#show393").show(2000);
        $("#show16").show(2000);        
    }
    
})

// function dados() {
//     var emp = document.getElementById('empreendimento').value;
//     try {
//         //Campos que irá trazer
//         var fields = new Array("codigoFilial", "razaoSocial", "empreendimento");
//         //Monta as constraints para consulta
//         var constraints = new Array();
//         constraints.push(DatasetFactory.createConstraint("empreendimento", emp, emp, ConstraintType.MUST));
    
//         //Define os campos para ordenação
//         var sortingFields = new Array("empreendimento");
    
//         //Busca o dataset
//         var dataset = DatasetFactory.getDataset("dsFormFilial", fields, constraints, sortingFields);
//         var count   = dataset.values.length;
    
//         if (count == 0) {
//             alert("Filiais não encontrado!");
//         } else {                
//             $("#codigoFilial").val(dataset.values[0].codigoFilial);
//             $("#razaoSocial").val(dataset.values[0].razaoSocial);
                
                
//         }
//     } catch (e) {
//         // TODO: handle exception
//         console.log("ERRO: " + e);
//         alert("ERRO: " + e);
//     }    
// }
function validaCodigo(codcliente) {
    try {
        //Campos que irá trazer
        var fields = new Array("codigoCliente","nomeCliente", "razaoSocial", "empreendimento","lote","quadra");
        //Monta as constraints para consulta
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("codigoCliente", codcliente, codcliente, ConstraintType.MUST));
            
        //Define os campos para ordenação
        var sortingFields = new Array("codigoCliente");
            
        //Busca o dataset
        var dataset = DatasetFactory.getDataset("dsProcessoSubjudice", fields, constraints, sortingFields);
        var count   = dataset.values.length;
        console.log(count)   
        
        if (count == 0) {
            console.log("Cliente não encontrado!");
        } else {    
            console.log("Cliente encontrado!");
            for (let i = 0; i < count; i++) {
                console.log("O cliente "+dataset.values[i].nomeCliente+" já tem um processo do subjudice em aberto:"+
                "\nEmpreendimento:"+dataset.values[i].empreendimento+
                "\nLote:"+dataset.values[i].lote+
                "\nQuadra:"+dataset.values[i].quadra)                
            }
            
            // $("#codigoFilial").val(dataset.values[0].codigoFilial);
            // $("#razaoSocial").val(dataset.values[0].razaoSocial);
        }
    } catch (e) {
        // TODO: handle exception
        console.log("ERRO: " + e);
        alert("ERRO: " + e);
    }
}

function chamaHist(){
    atividadeAtual = getWKNumState();
    if(atividadeAtual != "0"){
        historicoProcesso(getWKNumProces())
    }
}