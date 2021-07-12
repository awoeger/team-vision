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

  :hover {
    color: white;
  }
`;
