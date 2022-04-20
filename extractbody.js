// function to store value in browser
// function insertValue(e){
//   e.preventDefault();

// // parses number of characters from value input
//   if(document.querySelector('#value').value.length < 6) {
//     alert("Insira um valor válido, com no mínimo 3 dígitos");
//     val.value = '';
//     val.focus();
//     return false
//   }
// // parses number of characters from text input
//   else if(document.querySelector('#mercadoria').value.length < 2){
//     alert("Insira ao menos dois caracteres para descrever a mercadoria");
//     merc.value = '';
//     merc.focus();
//     return false
//   }
// // parses if there is already a list stored in the browser
//   if(localStorage.getItem('list') !=null ){
//     let list = localStorage.getItem('list');
//     let objList = JSON.parse(list);
//     // create an object with the data entered
//     let newEntrance = {
//       operation : document.getElementById('select').options[document.getElementById('select').selectedIndex].value == 'Venda' ? '+' : '-',
//       merc: document.querySelector('#mercadoria').value,
//       val: document.querySelector('#value').value
//     }
//     // insert the new object into the list
//     objList.push(newEntrance);
//     // store in the browser
//     localStorage.setItem('list', JSON.stringify(objList))
//     // input text clean
//     document.querySelector('#mercadoria').value = ""
//     // input number clean
//     document.querySelector('#value').value = ""
//     // variable to get the elements already inserted in the html
//     let nodeList = document.querySelectorAll('div.delDiv')
//     // looping to erase current elements
//     for(let i = nodeList.length - 1; i >= 0; i--) {
//       nodeList[i].remove();
//     }
//     // calling function that loads all items stored in the browser and inserts these into the html
//     loadStorage()
//   }
// // if there is no list stored in the browser
//   else{
//     // create an object for storage the data 
//     let newEntrance = {
//       operation : document.getElementById('select').options[document.getElementById('select').selectedIndex].value == 'Venda' ? '+' : '-',
//       merc: document.querySelector('#mercadoria').value,
//       val: document.querySelector('#value').value
//     }
//     // create an list
//     list = []
//     // insert the object in the list
//     list.push(newEntrance);
//     // store list in browser as string
//     localStorage.setItem('list', JSON.stringify(list))
//     // clear the text field
//     document.querySelector('#mercadoria').value = ""
//     // clear the number field
//     document.querySelector('#value').value = ""
//     // calling function that loads all items stored in the browser and inserts these into the html
//     loadStorage()
//   }
// }  
// function to put data stored in html
// function loadStorage(){
//   // variable for create element of text
//   let newP = document.createElement('p');
//   // select a class
//   let contExtrato = document.querySelector('.container_extract');
//   // variable for create element of div
//   let newDiv = document.createElement('div');
//   // select a class
//   let result = document.querySelector('.sum');
//   // select a class
//   let divResult = document.querySelector('.container_result');
//   // selects a class and adds a method to insert after it
//   let contHead = document.querySelector('.head').nextSibling;
//   let sum = 0
//   let numJs = 0
//   let number = 0
  
//   if(localStorage.getItem('list')!= null){
//     list = localStorage.getItem('list')
//     let objectList = JSON.parse(list)

//     for(itens of objectList.reverse()){
//       Object.values(itens).forEach(function(item){
//         newP = document.createElement('p');
//         newP.textContent = item;
//         newDiv.appendChild(newP);
//       })
//       if(objectList.length <= 1){
//           document.querySelector('.delDivNothing').remove();
//         }
//         newDiv.setAttribute('class','delDiv')
//         contExtrato.insertBefore(newDiv, contHead);     
//         newDiv = document.createElement('div');
//     }  
//     let nodeList = document.querySelectorAll('div.delDiv, div.head, div.line')

//     for(let i = nodeList.length - 1; i >= 0; i--) {
//       nodeList[i].style.visibility = 'visible';
//     }

//     for(i in objectList){
//       numJs = objectList[i].val.replace(/[^\d\,]/g , '');
//       number = numJs.replace(/[\,]/g, '.');
//       (objectList[i].operation === "+") ? sum += parseFloat(number) : sum -= parseFloat(number);
//     }

//     result.textContent = sum.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})

//     if(sum > 0){
//       let sizeGain = document.querySelectorAll('p.delP').length
//       if(sizeGain >= 1){
//         document.querySelector('.delP').remove();
//       }
//       newP = document.createElement('p');
//       newP.textContent = '[lucro]';
//       newP.setAttribute('class','delP');
//       divResult.appendChild(newP);
//     }
//     else if(sum < 0){
//       let sizeGain = document.querySelectorAll('p.delP').length
//       if(sizeGain > 0){
//         document.querySelector('.delP').remove();
//       }
//       newP = document.createElement('p');
//       newP.setAttribute('class','delP')
//       newP.textContent = '[perda]'
//       divResult.appendChild(newP);
//     }
//   }  
//   else{
//     let nodeList = document.querySelectorAll('div.delDiv, div.head, div.line')
//     for(let i = nodeList.length - 1; i >= 0; i--) {
//       nodeList[i].style.visibility = 'hidden';
//     }
//     // contExtrato.style="display:flex;flex-direction:flex-column;align-items:center;justify-content:center;height:100px"  
//     newP.textContent = "Nenhuma transação Realizada";
//     newDiv.appendChild(newP);
//     newDiv.setAttribute('class','delDivNothing');
//     newP.setAttribute('class','insertP')
//     contExtrato.appendChild(newDiv);
//   }   
// }
