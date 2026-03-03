const applyStyle = (parameterClass, styleCallback) => {
    document.querySelectorAll(parameterClass).forEach((element) => {
      styleCallback(element);
    });
  };
  const getRandomNumber = (max) => Math.floor(Math.random() * max);
  const getRandomNumberPx = (max) => `${getRandomNumber(max)}px`;
  const getRandomItem = (array) => array[getRandomNumber(array.length)];
  
  
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  const changeStyle = (parameterClass, styleProperty, valueGenerator) => {
    applyStyle(parameterClass, (element) => {
      element.style[styleProperty] = valueGenerator();
    });
  };
  

  const changeFontSize = (parameterClass, min = 1, max = 10) => {
    changeStyle(parameterClass, 'fontSize', () => `${getRandomInt(min, max)}vh`);
  };
  
  const changeFlex = (parameterClass, amount) => {
    changeStyle(parameterClass, 'flex', () => Math.floor(Math.random() * amount));
  };
  
  const changeColorCss = (parameterClass, arag) => {
    changeStyle(parameterClass, 'backgroundColor', () => getRandomItem(arag));
  };
  
  const changeFontFamily = (parameterClass, arag) => {
    changeStyle(parameterClass, 'fontFamily', () => getRandomItem(arag));
  };
  
  const changeFontColorCss = (parameterClass, arag) => {
    changeStyle(parameterClass, 'color', () => getRandomItem(arag));
  };
  
  const changeClass = (parameterClass, arag) => {
    applyStyle(parameterClass, (element) => {
      const className = getRandomItem(arag);
      element.classList.remove('singleLetter--black');
      element.classList.remove('singleLetter--white');
      element.classList.add(className);
    });
  };
    
  // Change Box Rotation
  const changeBoxRotation = (parameterClass, min = 1, max = 10) => {
    applyStyle(parameterClass, (element) => {
      const randomInt = getRandomInt(min, max);
      const randvalOne = getRandomInt(1, 50);
      const randvalTwo = getRandomInt(1, 50);
      element.style.transform = `rotate(${randomInt}deg)`;
      element.style.transformOrigin = `${randvalOne}% ${randvalTwo}%`;
    });
  }
  
// Change border Radius
const changeBorderRadius = (parameterClass, arag) => {
    applyStyle(parameterClass, (element) => {
      const item = Array.from({length: 4}, () => getRandomItem(arag));
      element.style.borderRadius = item.join(" ");
    });
  };

  const getRandomGradient = (arag) => {
    const orientation = Math.floor(Math.random() * 360);
    const colorOne = getRandomItem(arag);
    const colorTwo = getRandomItem(arag);
    return `linear-gradient(${orientation}deg, ${colorOne}, ${colorTwo})`;
  };
  // Change Gradients

  const cssGradients = (parameterClass, arag) => {
    applyStyle(parameterClass, (element) => {
      if (Math.random() > 0.97) {
        element.style.background = getRandomGradient(arag);
      }
    });
  };
    // Change IDGradients

  const cssIDGradient = (parameterClass, arag) => {
    changeStyle(parameterClass, 'background', () => getRandomGradient(arag));
  };
  
  const getCssValuePrefix = () => {
    let rtrnVal = ''; //default to standard syntax
    const prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];
  
    // Create a temporary DOM object for testing
    const dom = document.createElement('div');
  
    for (let i = 0; i < prefixes.length; i++) {
      // Attempt to set the style
      dom.style.background = `${prefixes[i]}linear-gradient(#000000, #ffffff)`;
  
      // Detect if the style was successfully set
      if (dom.style.background) {
        rtrnVal = prefixes[i];
      }
    }
  
    return rtrnVal;
  }
