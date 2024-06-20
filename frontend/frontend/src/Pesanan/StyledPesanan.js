import styled from "styled-components";

export const StyledPesanan = styled.div`
  .inputPesanan {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    background-color: white;
    padding: 2rem;
    border: 1px solid rgb(70, 70, 244);
    border-radius: 1rem;
  }

  .buttonForm {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .buttonDanger {
    background-color: red;
    margin-left: 2px;
  }

  .buttonDanger:hover {
    background-color: rgb(243, 71, 32);
  }

  .buttonEdit {
    background-color: #3498db;
    margin-left: 2px;
  }

  .buttonEdit:hover {
    background-color: #2980b9;
  }

  .buttonShow {
    background-color: yellowgreen;
  }

  .buttonShow:hover {
    background-color: rgb(105, 151, 12);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 3px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;
