const utilities = {};


utilities.shuffle=(array)=> {

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  
    return array;
  }

utilities.taskProgress = (order) =>
{
  let rangeWeek = new Date((new Date()).valueOf() - 1000*60*60*24*150);


  // change 150 to 15 only

  let totalOrder=0,deliveredOrder = 0;

  console.log(rangeWeek)
    
  for(let i in order)
  {
    const d = new Date(Date.now(order[i].date));

    console.log(d);


      if(d>=rangeWeek)
      {
        totalOrder++;

        if(order[i].status=="delivered")
        deliveredOrder++;


      }
      
   
  }

  console.log(totalOrder)

  let task = (deliveredOrder*100) / totalOrder;

  return `${task}%`;
    
}


// export module
module.exports = utilities;