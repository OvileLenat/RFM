export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * 寻找数组中最大与最小值
 * @param Array
 * @returns Map
 */
export const getMaxandMin = (arr) => {
  let max = arr[0];
  let min = arr[0];
  let i = 0;
  let len = arr.length();
  let map = Map();
  while(i<len){
    if(a[i]>max){
      max = a[i];
    }
    if(a[i]<min){
      min = a[i];
    }
    i++;
  }
  map.set(max,max);
  map.set(min,min);
  return map;
}

/**
 *标准化，min-max 归一化
 *@param mold 类型 num 原值 max 数组最大值 min 数组最大值
 * mold=0 负向影响指标，mold=1 正向影响指标
 *@returns 0<= a number <=1
 */
export const officialOfMaxandMin = (mold,num,max,min) => {
  if(mold == 0){
    return (max-num)/(max-min)
  }else{
    return (num-min)/(max-min)
  }
}

/**
 * CR一致性比率检验
 * @param  
 * @param 
 */
export const checkoutCR = (rf,rm,fm) => {
  console.log(rf+"2"+rm+"3"+fm)
  let Customary = new Array();
  let columnNormalization = new Array();
  for(let i=0;i<3;i++){
    Customary[i] = new Array();
    columnNormalization[i] = new Array();
  }
  Customary[0]=[1,rf,rm];
  Customary[1]=[1/rf,1,fm];
  Customary[2]=[1/rm,1/fm,1];
  let countAllCol = new Array();
  for(let i=0;i<3;i++){
    let count = 0;
    for(let j=0;j<3;j++){
      count += Customary[j][i];
    }
    countAllCol[i] = count;
  }
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      columnNormalization[i][j] = Customary[i][j]/countAllCol[j];
    }
  }
  let countAllRow = new Array();
  for(let i=0;i<3;i++){
    let count = 0;
    for(let j=0;j<3;j++){
      count += columnNormalization[i][j];
    }
    countAllRow[i] = count;
  }
  let countLine = 0;
  let W = new Array();
  for(let i=0;i<3;i++){
    countLine += countAllRow[i];
  }
  for(let i=0;i<3;i++){
    W[i] = countAllRow[i]/countLine;
  }
  let CustomaryW = new Array();
  for(let i=0;i<3;i++){
    let count = 0;
    for(let j=0;j<3;j++){
      count += Customary[i][j]*W[j];
    }
    CustomaryW[i]=count;
  }
  let amdMax = 0;
  for(let i=0;i<3;i++){
    amdMax += CustomaryW[i]/W[i];
  }
  amdMax = amdMax/3;
  const CI = (amdMax-3)/2;
  const RI = 0.52;
  let returnArray = new Array();
  const CR = CI/RI;
  console.log(CR);
  console.log(W);
  returnArray[0]=CR;
  returnArray[1]=W[0];
  returnArray[2]=W[1];
  returnArray[3]=W[2];
  return returnArray;
}


export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length == 0 && keysArr2.length == 0) return true
  else return !keysArr1.some(key => obj1[key] !== obj2[key])
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()