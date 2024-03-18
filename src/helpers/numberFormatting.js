
/** commaWholeNum takes a positive whole number and
 * returns a comma-formatted whole number with a $ in front
 *      1000000 => $1,000,000
*/
const commaWholeNum = (numLarge) =>{
    if(!numLarge) return;

    let strSalary = numLarge.toString().split("");
    const finalSalary = strSalary.map((digit, idx)=>{
        if((strSalary.length -idx) % 3 === 0 && idx !== 0){
            return "," + digit;
        }
        return digit;
    })
    return `$${finalSalary.join('')}`
}

export {commaWholeNum}