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
  let newDiv = document.createElement('div');
  let opt = document.getElementById('select');
  let val = document.getElementById('value');
  let merc = document.getElementById('mercadoria');
  let extract = document.querySelector('.container_extract');
  let ExtractHead = document.querySelector('.head').nextSibling;
  let newEntrance = {
    operation :(opt.options[opt.selectedIndex].value == 'Venda' ? '+' : '-'),
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
