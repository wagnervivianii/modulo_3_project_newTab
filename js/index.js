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


  