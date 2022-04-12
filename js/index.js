// Validation and formatting of text fields
function field_validation_text(e){
  e.preventDefault();
  const regText = /[a-z\s]+/gi;
  if(regText.test(e.key) && e.target.value.length < 40){
    e.target.value += e.key   
  }
  text = e.target.value.replace(/\s{2,}/g, ' ');
  e.target.value = text.toUpperCase();
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
  let val = document.getElementById('value');
  let merc = document.getElementById('mercadoria');
  let extract = document.querySelector('.container_extract');
  let ExtractHead = document.querySelector('.head').nextSibling;
  let newDiv = document.createElement('div');
  let newP = document.createElement('p');
  var op = document.querySelector('select option');
  let newEntrance = {
    operation : (op.value == 'Venda' ? '+' : '-'),
    merc: merc.value,
    val: val.value
  }
  if(val.value.length < 6) {
    alert("Insira um valor válido, com no mínimo 3 dígitos");
    val.value = '';
    val.focus();
    return false
  }
  else if(merc.value.length < 2){
    alert("Insira ao menos dois caracteres para descrever a mercadoria");
    merc.value = '';
    merc.focus();
  }
  else{
    Object.values(newEntrance).forEach(function(item){
      let newP = document.createElement('p');
      newP.textContent = item;
      newDiv.appendChild(newP);
    })
  extract.insertBefore(newDiv, ExtractHead)
  }
  console.log(op.value);

}

  