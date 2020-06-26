import React from 'react';
import './Button.scss';

/*
  A Button component needs next required parameters to be used:
    1) text: String - a title of the button.
    2) onClick : Function - a method, which will be called, when the button is clicked.

  The Button also has optional parameters:
    1) type: String (default value - 'button') - parameter corresponds with 
      html-attribute of the <button/> tag. The parameter may have next values:
        - button 
        - submit 
    2) color: String (default value - 'primary') - defines the component color. 
      May accept next values: 
        - primary 
        - regular 
        - action 
        - error 
    3) size: String (default value - 'small') - defines the size of the component.
      May accept next values:
        - small 
        - medium 
        - hard 
    4) form: Sting - this parameter is used with 'submit' button type. In case if the
      component is used outside its form, the neccessary form name may be passed to the
      component.
    5) id: any - html id attribute.
*/

enum ButtonActionTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

enum ButtonColorTypes {
  PRIMARY = 'primary',
  ERROR = 'error',
  ACTION = 'action',
  REGULAR = 'regular',
}

enum ButtonSizeTypes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface Button {
  text: string;
  onClick: () => any;
  type?: ButtonActionTypes;
  color?: ButtonColorTypes;
  size?: ButtonSizeTypes;
  form?: string;
  id?: string;
}

const Button = ({
  text,
  onClick,
  type = ButtonActionTypes.BUTTON,
  color = ButtonColorTypes.REGULAR,
  size = ButtonSizeTypes.SMALL,
  form,
  id,
}: Button) => {
  return (
    <button
      type={type}
      className={`button ${color || ButtonColorTypes.REGULAR} ${
        size || ButtonSizeTypes.SMALL
      }`}
      onClick={onClick}
      form={form && form}
      id={id && id}
    >
      {text}
    </button>
  );
};

export default Button;
