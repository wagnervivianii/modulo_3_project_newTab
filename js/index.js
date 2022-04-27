// Validation and formatting of text fields
// function field_validation_text(e){
//   e.preventDefault();
//   // regular expression to only allow lalphas and spaces
//   const regText = /[a-zA-Z\s]/gi;
//   // testing expression and limiting number of characters
//   if(regText.test(e.key) && e.target.value.length < 40){
//   //capital first letter
//   e.target.value += (e.target.value.length == 0 ? e.key.toUpperCase() : e.key.toLowerCase());
//   // removing unnecessary spacing between words
//   text = e.target.value.replace(/\s{2,}/g, ' ');
//   // returning treated value to input
//   e.target.value = text
//   }
// }

String.prototype.reverse = function(){
  return this.split('').reverse().join(''); 
};

// Validation and formatting of number fields
function fieldsValidationNum(campo,e){

  e.preventDefault();

  let valor  =  campo.value.replace(/[^\d]+/gi,'').reverse();
  let resultado  = "";
  let mascara = "##.###.###.###,##".reverse();
  for (let x=0, y=0; x<mascara.length && y<valor.length;) {
    if (mascara.charAt(x) != '#') {
      resultado += mascara.charAt(x);
      x++;
    } else {
      resultado += valor.charAt(y);
      y++;
      x++;
    }
  }
  campo.value = `R$ ${resultado.reverse()}`;
}

function storageInObj(){

  let number = document.querySelector('#value').value.replace(/[R$\s\.\,]+/gi, "");

  if (document.querySelector('#value').value.length >=6) {
    var data ={
      tipo : document.getElementById('select').options[document.getElementById('select').selectedIndex].value == 'Venda' ? '+' : '-',
      mercadoria : document.getElementById('mercadoria').value,
      valor : document.getElementById('value').value
      
    };
    if(isNaN(number) == false ){
      Lstorage(data);
      clearFormFIlds();
    }
    else{
      alert('Dados incorretos, por favor, tente novamente! ');
      clearFormFIlds();
      return false
    }
  }
  else if(document.querySelector('#value').value.length == 4 ||document.querySelector('#value').value.length == 5){
    document.querySelector('#value').value += ',00'
    var data ={
      tipo : document.getElementById('select').options[document.getElementById('select').selectedIndex].value == 'Venda' ? '+' : '-',
      mercadoria : document.getElementById('mercadoria').value,
      valor : document.getElementById('value').value
      
    };
    if(isNaN(number) == false ){
      Lstorage(data);
      clearFormFIlds();
    }
    else{
      alert('Dados incorretos, por favor, tente novamente! ');
      clearFormFIlds();
      return false
    }  
  }
  else{
    alert('Dados incorretos, por favor, tente novamente! ');
    clearFormFIlds();
    return false
  }
}

function Lstorage(data){
  if (localStorage.getItem('list') != null){
    const newList =  JSON.parse(localStorage.getItem('list'));
    newList.push(data);
    localStorage.setItem('list', JSON.stringify(newList));
  }
  else{
    const list = [];
    list.push(data);
    localStorage.setItem('list', JSON.stringify(list));
  }
}

function clearFormFIlds(){
  document.getElementById('mercadoria').value = ""
  document.getElementById('value').value = ""
}

function InsertHtmlData(e){

  e.preventDefault()

  storageInObj()

  tagVerification()


  if(localStorage.getItem('list')!= null){
    list = JSON.parse(localStorage.getItem('list'));
    callInsert(list)
    sum();
  }
}

function callInsert (list){
  let contLines = document.querySelector("#e-lines");
  contLines.innerText = ''
  for(i in list.reverse()){
    let newDiv = document.createElement('div');
    Object.values(list[i]).forEach(function(valor){
      let newP = document.createElement('p');
      newP.textContent = valor
      newDiv.appendChild(newP);
    })
    contLines.appendChild(newDiv);
  }
}

function cleanData(){
  tagVerification()
  let container = document.querySelector('.container_extract');
  container.removeChild(container.children[1]).remove
  container.removeChild(container.children[1]).remove
  localStorage.clear();
  newP = document.createElement('p');
  newP.textContent = "Nenhuma transação realizada"
  document.querySelector('#e-title').appendChild(newP);
}

function tagVerification(){
  if (document.querySelector("#e-head") == null && localStorage.getItem('list') != null) {
    const newP = document.createElement('p');
    const newDiv = document.createElement('div');
    const containnerExtract = document.querySelector('.container_extract');

    newP.textContent = 'Mercadoria'
    newDiv.appendChild(newP);
    newDiv.setAttribute('id', 'e-head')
    const newP2 = document.createElement('p');
    newP2.textContent = 'Valor'
    newDiv.appendChild(newP2);
    containnerExtract.appendChild(newDiv)

    const newDiv2 = document.createElement('div');
    newDiv2.setAttribute('id', 'e-lines')
    containnerExtract.appendChild(newDiv2)

    document.querySelector('#e-title p') != null ? document.querySelector('#e-title p').parentNode.removeChild(document.querySelector('#e-title p')) : '';

  }
  else if(document.querySelector('#e-title p') == null && document.querySelector('#e-lines') == null){
    newP = document.createElement('p');
    newP.textContent = "Nenhuma transação realizada"
    document.querySelector('#e-title').appendChild(newP);
  }
  
}

function loadPage(){
  tagVerification()
  if(localStorage.getItem('list') != null){
    list = JSON.parse(localStorage.getItem('list'))
    callInsert(list)
    sum()
  }
}

function sum(){
  let soma = 0
  if(localStorage.getItem('list') != null){
    objectList = JSON.parse(localStorage.getItem('list'));
    for(i in objectList){
      numJs = objectList[i].valor.replace(/[^\d\,]/g , '');
      number = numJs.replace(/[\,]/g, '.');
      (objectList[i].tipo === "+") ? soma += parseFloat(number) : soma -= parseFloat(number);
    }

    if(document.querySelector('#total') == null){
      const contLines = document.querySelector('#e-lines');

      const newP = document.createElement('p');

      const newDiv = document.createElement('div');

      newDiv.setAttribute('id','total');

      newP.textContent = 'Total';

      newDiv.appendChild(newP);

      const newP2 = document.createElement('p');

      const newDiv2 = document.createElement('div');
      newDiv2.setAttribute('id','totalInf')

      newP2.textContent = soma.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

      newDiv2.appendChild(newP2);

      newDiv.appendChild(newDiv2)

      contLines.appendChild(newDiv);
      
    }
    else{
      document.querySelector('#total').lastChild.innerText = soma.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
    }

    if(soma > 0){
      let sizeGain = document.querySelectorAll('p.delP').length
      if(sizeGain >= 1){
        document.querySelector('.delP').remove();
      }
      let newP = document.createElement('p');
      newP.textContent = '[lucro]';
      newP.setAttribute('class','delP');
      document.querySelector('#totalInf').appendChild(newP)
    }
    else if(soma < 0){
      let sizeGain = document.querySelectorAll('p.delP').length
      if(sizeGain > 0){
        document.querySelector('.delP').remove();
      }
      let newP = document.createElement('p');
      newP.setAttribute('class','delP')
      newP.textContent = '[perda]'
      document.querySelector('#totalInf').appendChild(newP)
    }  
  }
}

onload = loadPage()