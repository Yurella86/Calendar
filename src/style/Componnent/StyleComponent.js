import styled from 'styled-components';

export const GlobalWrap = styled.div`
margin: 0px 20px;
`;

export const WrapperHdContainer = styled.div`
padding: 10px 20px;
line-height: 40px; 
.left-hd {
    margin: 0px 50px;
}

.center-hd {
    flex-grow: 1;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
}

.right-hd {
    flex-basis: 400px;

    .flex-hr {
        justify-content: flex-end;
        line-height: 20px;
        align-items: center;
    }

    .add-event {
        margin-right: 50px;
        padding: 5px 10px;
        line-height: 20px;
        border-radius: 4px;
        background-color: rgb(131, 154, 219);

        &:hover {
            background-color: rgb(92, 109, 156);
        }

        span {
            text-transform: capitalize;
        }
    }

    .arrow {
        display: inline-block;
        width: max-content;
        cursor: pointer;
    }

    .example-custom-input {
        width: 120px;
        padding: 0 10px;
        background-color: transparent;
        display: block;
    }
}

.react-datepicker-popper {
    z-index: 100;
}
.react-datepicker__input-container .react-datepicker__calendar-icon {
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
.react-datepicker__triangle {
    left: 55px !important;
}
.react-datepicker__view-calendar-icon input {
    position: relative;
    cursor: pointer;
    background-color: transparent;
    padding: 5px 10px !important;
    z-index: 100;
}

.react-datepicker {
    right: 50px !important;
}
`;

export const FlexHrBtw = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const WrapperCalendar = styled.div`
  margin: 10px auto;
  max-width: 1170px;

  .grid-calendar {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    grid-template-rows: auto;
    gap: 1px;
    padding: 1px;
    background-color: black;


    .wrapper-day {
      position: relative;
      max-width: 160px;
      min-height: 100px;
      padding: 5px 10px;
      cursor: pointer;
      z-index: 10;
      background-color: white;
      transition: transform 0.5s ease;
      background-color: rgb(233, 244, 252);

      &:hover:not(.out-of-month) {
        z-index: 11;
        transform: scale(1.1, 1.1);
        transition: transform 0.2s ease;
        border: none;
        box-shadow: 0px 0px 10px rgb(148, 148, 148);
        overflow: hidden;
      }

      &.weekend {
        background-color: rgb(202, 229, 253);
      }

      &.out-of-month {
        color: rgb(199, 199, 199);
        background-color: rgb(255, 255, 255);
        cursor: auto;
      }

      &.current {
        background-color: #c6f2b0;
      }

      .number {
        text-align: center;
        font-size: 14px;
        line-height: 20px;

        .flex-hr {
          justify-content: space-between;
        }
      }
    }
  }
`;

export const ModalWindowWrapper = styled.div`
  .modal-head {
    text-align: center;
    text-transform: capitalize;
  }

  .exit {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid black;
      border-radius: 50%;
    }

    &::before,
    &::after {
      display: inline-block;
      position: relative;
      content: " ";
      width: 10px;
      height: 2px;
      border-radius: 1px;
      background-color: black;
    }

    &::before {
      top: -5px;
      left: 5px;
      transform: rotate(-45deg);
    }

    &::after {
      top: -5px;
      left: -5px;
      transform: rotate(45deg);
    }
  }

  .modal-content {
    padding: 10px 20px;

    & > div {
      margin: 5px auto;
      line-height: 30px;
    }
  }

  .title input {
    border-bottom: 1px inset black;
  }

  textarea {
    background-color: rgb(233, 233, 250);
    border-radius: 5px;
  }

  .title input,
  textarea {
    width: 100%;
    line-height: 26px;
    font-size: 16px;
    padding: 0 5px;
  }

  label {
    display: inline-block;
    min-width: 50px;
    margin-right: 10px;
  }

  .button-container {
    margin: 30px auto 10px !important;
    display: flex;
    justify-content: space-around;
    flex-direction: row;

    button {
      display: block;
      min-width: 100px;
      padding: 10px 20px;
      line-height: 1em;
      font-size: 16px;
      border-radius: 4px;
      background-color: rgb(131, 154, 219);

      &:hover {
        color: white;
        background-color: rgb(92, 109, 156);
      }

      &.delete {
        background-color: rgb(160, 27, 27);
        color: white;

        &:hover {
          color: white;
          background-color: rgb(121, 21, 21);
        }
      }
    }
  }
`;

export const EventsStyleItems = styled.div`
  max-height: 70px;
  overflow-y: auto;
`;


