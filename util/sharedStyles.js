import { css } from '@emotion/react';

// Color Palette
export const darkBlue = '#1d2a48';
export const lightBlue = '#1c9a96';
export const lightPink = '#f8dad0';
export const lightGrey = '#e6f2ff';
export const orange = '#fd3c01';

// Text sizes
export const normalText = '16px';
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

  :active {
    transform: translate(0, 3px);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.8em;
  }
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

  :active {
    transform: translate(0, 3px);
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.8em;
  }
`;

// Trash Button on team and events

export const trashButton = css`
  padding: 10px;
  color: ${orange};
  background: rgba(255, 255, 255, 0.7);
  border-radius: 90%;
  border: none;
  cursor: pointer;

  :hover {
    background: white;
  }

  :active {
    transform: translate(0, 3px);
  }

  .btn {
    width: 20px;
    height: 20px;
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
  margin-top: 40px;
  margin-right: 30px;

  .button-active {
    background: rgb(28 154 150);
    color: white;
  }

  .button-inactive {
    background: white;
  }

  button {
    width: 100%;
    margin: 30px 0px;
    padding: 15px;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    color: ${darkBlue};
    border: ${lightBlue} 3px solid;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;
    }

    :hover {
      background: rgb(28 154 150);
      color: white;
    }

    :active {
      transform: translate(0, 3px);
      background: rgb(28 154 150);
      color: white;
    }

    button {
      font-size: ${normalText};
    }
  }

  @media (max-width: 899px) {
    flex-direction: row;
    margin: 0;
    justify-content: space-between;

    button {
      width: 22%;
      font-size: 16px;
      text-align: center;

      span {
        margin: 0;
      }

      .icon {
        display: none;
      }
    }
  }

  @media (max-width: 777px) {
    button {
      font-size: 0.8em;
    }

    @media (max-width: 644px) {
      flex-wrap: wrap;
    }
  }
`;
