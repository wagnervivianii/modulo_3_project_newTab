// Validation and formatting of text fields
function field_validation_text(e){
  e.preventDefault();
  // regular expression to only allow lalphas and spaces
  const regText = /[a-zA-Z\s]/gi;
  // testing expression and limiting number of characters
  if(regText.test(e.key) && e.target.value.length < 40){
  //capital first letter
  e.target.value += (e.target.value.length == 0 ? e.key.toUpperCase() : e.key.toLowerCase());
  // removing unnecessary spacing between words
  text = e.target.value.replace(/\s{2,}/g, ' ');
  // returning treated value to input
  e.target.value = text
  }
}

String.prototype.reverse = function(){
  return this.split('').reverse().join(''); 
};

function fields_validation_num(campo,evento){
  let tecla = (!evento) ? window.event.keyCode : evento.which;
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

function insertValue(e){
  e.preventDefault();

  if(document.querySelector('#value').value.length < 6) {
    alert("Insira um valor válido, com no mínimo 3 dígitos");
    val.value = '';
    val.focus();
    return false
  }

  else if(document.querySelector('#mercadoria').value.length < 2){
    alert("Insira ao menos dois caracteres para descrever a mercadoria");
    merc.value = '';
    merc.focus();
    return false
  }
  // create a variable of list for storage
  if(localStorage.getItem('list') !=null ){
    let list = localStorage.getItem('list');
    let objList = JSON.parse(list);

    let newEntrance = {
      operation : document.getElementById('select').options[document.getElementById('select').selectedIndex].value == 'Venda' ? '+' : '-',
      merc: document.querySelector('#mercadoria').value,
      val: document.querySelector('#value').value
    }
    objList.push(newEntrance);
    localStorage.setItem('list', JSON.stringify(objList))
    document.querySelector('#mercadoria').value = ""
    document.querySelector('#value').value = ""
    let nodeList = document.querySelectorAll('div.delDiv')
    for(let i = nodeList.length - 1; i >= 0; i--) {
      nodeList[i].remove();
    }
    loadStorage()
  }
  else{
    let newEntrance = {
      operation : document.getElementById('select').options[document.getElementById('select').selectedIndex].value == 'Venda' ? '+' : '-',
      merc: document.querySelector('#mercadoria').value,
      val: document.querySelector('#value').value
    }
    list = []
    list.push(newEntrance);
    localStorage.setItem('list', JSON.stringify(list))
    document.querySelector('#mercadoria').value = ""
    document.querySelector('#value').value = ""
    loadStorage()
  }
}  
  
function loadStorage(){
  let newP = document.createElement('p');
  let contExtrato = document.querySelector('.container_extract');
  let contHead = document.querySelector('.head').nextSibling;
  let main = document.querySelector('.main');
  let newDiv = document.createElement('div');
  newDiv.setAttribute('class','delDiv')
  if(localStorage.getItem('list')!= null){
    list = localStorage.getItem('list')
    let objectList = JSON.parse(list)

    for(itens of objectList){
      Object.values(itens).forEach(function(item){
        let newP = document.createElement('p');
        newP.textContent = item;
        newDiv.appendChild(newP);
      })
      if(objectList.length > 1){
        contExtrato.insertBefore(newDiv, contHead);
        newDiv = document.createElement('div');
        newDiv.setAttribute('class','delDiv')
      }
      else{
        contExtrato.style.display = 'flex';
        document.querySelector('.insertP').style.display ='none';
        contExtrato.insertBefore(newDiv, contHead);
        newDiv.setAttribute('class','delDiv')
      }

    }
  }
  else{
    contExtrato.style.display = 'none';
    newP.textContent = "Nenhuma transação Realizada";
    newDiv.appendChild(newP);
    newP.setAttribute('class','insertP')
    main.appendChild(newDiv);

  }
    
}


  
