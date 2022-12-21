let submitBtn = document.getElementById('submit')
let clearBtn = document.getElementById('clear')
let getTable = document.getElementById('table1');
let getTable2 = document.getElementById('table2');
let getTbody1 = document.getElementById('tbodyEl');
let getTbody2 = document.getElementById('tbodyEl1');
let inputField = document.getElementById('input');
let tableRow = getTable.rows.length - 1;
let span = document.getElementById('title-interest')
let tableRow1 = getTable2.rows.length - 1;
let span1 = document.getElementById('title-suggestion')
let keyword;
let select = document.getElementById('lang');
let text = document.getElementById('text-inputfield')
let url = new URL (`https://graph.facebook.com/search?type=adinterest&q=&limit=10000&locale=th_TH&access_token=2261992270589453|ic8EkSE5wf4mcH5GSqLbfIDUPY0`);
let url1 = new URL (`https://graph.facebook.com/search?type=adinterestsuggestion&interest_list=&limit=10000&locale=th_TH&access_token=2261992270589453|ic8EkSE5wf4mcH5GSqLbfIDUPY0`); 

inputField.onkeyup = function(){
  keyword = inputField.value;
}

function switchLang(){
  url.searchParams.set('locale', select.options[select.selectedIndex].value);
  url.toString();
  return url
}
function switchLang1(){
  url1.searchParams.set('locale', select.options[select.selectedIndex].value);
  url1.toString();
  return url1
}
function insertKeyword(){
  url.searchParams.set('q', '['+keyword+']');
  url.toString();
  return url
}
function insertKeyword1(url1){
  url1.searchParams.set('adinterestsuggestion&interest_list', keyword);
  url1.toString();
  return url1
} 


function getInterest(){

  span.innerHTML = "";
  getTable.innerHTML =''

function insertKeyword(){
    url.searchParams.set('q', '['+keyword+']');
    url.toString();
    return url
  }

      async function toFetch(){
          let response = await fetch(insertKeyword(url))
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('error');
            }
          };

        async function main(){}
          toFetch(url).then(data => {
            displayData(data);
          })

          main();
}
//format data
function displayData(data){

  function showInterest(){

    getTable.innerHTML =''

    let interestData = data.data; 

    for (let i = 0; i < data.data.length; i++){
    
      getTable.innerHTML += `
        <tr>
          <td><strong>${interestData[i].name}</strong></td>
          <td>${interestData[i].audience_size_upper_bound}</td>
          <td>${interestData[i].topic}</td>
        </tr> 
      `
      }
    }

      if(window.inputField ==""){
        alert('โปรดใส่คีย์เวิร์ดก่อน')
        }
          else if(getTable.rows.length > 1){
          async function removeRow() {

          while (getTable.rows.length > 1)
          getTable.deleteRow(1)

          } async function showInterestAfterDelete() {
          await removeRow();
          showInterest();

          } showInterestAfterDelete();

          } else {
    
            showInterest();
            countInterest()
          } 

} 
function getInterestSuggestion(){
  
  span1.innerHTML = "";
  getTable2.innerHTML =''

  function insertKeyword1(){
    url1.searchParams.set('interest_list', '["'+keyword+'"]');
    //url1.toString();
    return url1
  }

    async function toFetch1(){
      let response = await fetch(insertKeyword1(url1))
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('error');
        }
      };

    async function main(){}
      toFetch1(url1).then(data1 => {
        displayData1(data1);
      })

      main();
}
//format data
function displayData1(data1){

  function showInterest1(){

    let interestData1 = data1.data; 

    for (let i = 0; i < data1.data.length; i++){
    
      getTable2.innerHTML += `
        <tr>
          <td><strong>${interestData1[i].name}</strong></td>
          <td>${interestData1[i].path}</td>
        </tr> 
      `
      }
    }

      if(window.inputField ==""){
        alert('โปรดใส่คีย์เวิร์ดก่อน')
        }
          else if(getTable2.rows.length > 1){
          async function removeRow1() {

          while (getTable2.rows.length > 1)
          getTable2.deleteRow(1)

          } async function showInterestAfterDelete1() {
          await removeRow1();
          showInterest1();

          } showInterestAfterDelete1();

          } else {

            showInterest1();
            countInterest();
          } 

}
//Call API when Click Search Button
submitBtn.addEventListener('click',() =>{
  getInterest();
  getInterestSuggestion();
})
//Clear Result Button
clearBtn.addEventListener('click',()=> {
  $("#table1 tbody tr").remove();
  $("#table2 tbody tr").remove();
  $("#title-interest, #title-suggestion").html('');
})
//show interest number
function countInterest() {
  const tableRow = getTable.rows.length - 1;
  const tableRow1 = getTable2.rows.length - 1;
  const resultDiv = document.getElementsByTagName('span');

  if (tableRow < 0 && tableRow1 < 0) {
    resultDiv.innerHTML = '';
  } else {
    span.innerHTML = ` (จำนวน ${tableRow})`;
    span1.innerHTML = ` (จำนวน ${tableRow1})`;
  }
}