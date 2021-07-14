import { css } from '@emotion/react';

// Color Palette
export const darkBlue = '#1d2a48';
export const lightBlue = '#1c9a96';
export const lightPink = '#f8dad0';
export const lightGrey = '#e6f2ff';
export const orange = '#fd3c01';

// Text sizes
export const normalText = '18px';
export const smallText = '0.75rem';
export const largeText = '1.5rem';

// Button
export const button = css`
  background-image: url(/images/button_background_lightBlue.PNG);
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  font-weight: bold;
  font-size: ${normalText};
  border: none;
  padding: 10px 20px;
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px, rgba(0, 0, 0, 0.22) 0px 4px 4px;
`;

// Link as Button
export const link = css`
  background-image: url('/images/button_background_lightBlue.PNG');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px 15px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px, rgba(0, 0, 0, 0.22) 0px 4px 4px;

  :hover {
    color: white;
  }
`;

// Heading for Event and Exercise Page
export const heading = css`
  text-align: center;
  margin-top: 40px;
  font-size: 2em;
`;

// Container for filter functionality
export const filterContainer = css`
  display: flex;
  flex-direction: column;
  margin: 100px 0 0 100px;
  position: fixed;
  left: 50px;
  top: 210px;

  button {
    width: 100%;
    margin: 30px 0px;
    padding: 15px;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 500;
    color: ${darkBlue};
    background: white;
    border: ${lightBlue} 3px solid;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;
    }

    :hover {
      background: rgb(28 154 150 / 50%);
    }
  }
`;
