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

// Validation and formatting of number fields
function fields_validation_num(campo,evento){
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
  if (document.querySelector('#mercadoria').value.length >=2 && document.querySelector('#value').value.length >=6){
    var data ={
      tipo : document.getElementById('select').options[document.getElementById('select').selectedIndex].value == 'Venda' ? '+' : '-',
      mercadoria : document.getElementById('mercadoria').value,
      valor : document.getElementById('value').value
      
    };
    Lstorage(data);
    clearFormFIlds();
  }
  else{
    alert('Para cadastrar os dados, é necessário que tenham mais de dois caracteres no campo mercadoria e no mínimo 3 no campo valor, por favor, tente novamente');
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

function InsertHtmlData(list){
  storageInObj()
  if(localStorage.getItem('list')!= null){
    list = JSON.parse(localStorage.getItem('list'));
    callInsert(list)
  }
  return false
}

function callInsert (list){
  let contExtract = document.querySelector('.container_extract');
  for(i in list){
    let newDiv = document.createElement('div');
    Object.values(list[i]).forEach(function(valor){
      let newP = document.createElement('p');
      newP.textContent = valor
      newDiv.appendChild(newP);
    })
    contExtract.appendChild(newDiv);
  }
}
  