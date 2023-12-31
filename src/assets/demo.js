  export function convertToHtml(options) {
    const { arrayBuffer } = options;
    return new Promise((resolve, reject) => {
      mammoth
        .convertToHtml({ arrayBuffer } , { ignore: "img" }) // Pass 'arrayBuffer' directly
        .then((result) => {
          const resultValue = result.value;
          resolve(resultValue); // Resolve with the 'result.value'
        })
        .catch((error) => {
          reject(error); // Reject with any errors that occur during conversion
        });
    });
  }
  

   function displayResult(result) {
    //  console.log(result.value)
    //  console.log('`````````````result.value`````````````')
    //  console.log('`````````````result.value`````````````')
   }
