import React from 'react';
import { Container, Table } from 'react-bootstrap';
// import NavigationBar from './components/NavigationBar';

function Account() {
  const accountInfo = {
    tradingAccountNumber: '12345678901234', // Replace with actual trading account number (UCC)
    primaryHolderName: 'John Doe',
    dateOfBirth: '01-Jan-1990',
    residentialStatus: 'Resident Indian',
    pan: 'ABCDE1234F',
    kraKyc: 'KYC Verified',
    ckycNumber: '98765432101234', // Replace with actual CKYC random 14-digit number
    fatcaStatus: 'FATCA Verified',
    dematAccountNumber: '98765432101234', // Replace with actual demat account number
    bankAccountNumber: '123456789012', // Replace with actual bank account number
    coHolderName: 'Jane Doe', // Replace with actual co-holder name if applicable
  };

  return (
    <>

    <Container className="my-4">

      <h2 className="mt-4 mb-3">Demat Account Information</h2>
      <p><strong>Trading Account Number (UCC):</strong> {accountInfo.tradingAccountNumber}</p>
      <p><strong>Primary Holder Name:</strong> {accountInfo.primaryHolderName}</p>
      <p><strong>Date of Birth:</strong> {accountInfo.dateOfBirth}</p>
      <p><strong>Residential Status:</strong> {accountInfo.residentialStatus}</p>
      <p><strong>PAN:</strong> {accountInfo.pan}</p>
      <p><strong>KRA KYC:</strong> {accountInfo.kraKyc}</p>
      <p><strong>CKYC:</strong> {accountInfo.ckycNumber}</p>
      <p><strong>FATCA Status:</strong> {accountInfo.fatcaStatus}</p>

      <h3 className="mt-5 mb-3">Account Details</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Trading A/c No (UCC)</th>
            <th>Demat A/c No</th>
            <th>Bank Account Number</th>
            <th>Co-Holder Name</th>
            <th>PAN Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{accountInfo.tradingAccountNumber}</td>
            <td>{accountInfo.dematAccountNumber}</td>
            <td>{accountInfo.bankAccountNumber}</td>
            <td>{accountInfo.coHolderName}</td>
            <td>{accountInfo.pan}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
    </>
  );
}

export default Account;
