import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ModalWallet } from "./components/Modal";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/collections/Contacts.collection";
import { ErrorAlert } from "./components/ErrorAlert";
import { SuccessAlert } from "./components/SuccessAlert";
import { WalletsCollection } from "../api/collections/WalletsCollection";

export const Account = () => {

  const [modalShow, setModalShow] = useState(false);
  const [isTranfering, setIsTranfering] = useState(false);
  const [amount, setAmount] = useState(0);
  const [contactToSend, setContactToSend] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const showError = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg();
    }, 5000);
  };

  const showSuccess = (message) => {
    setSuccessMsg(message);
    setTimeout(() => {
      setSuccessMsg();
    }, 5000);
  };

  const isLoadingContacts = useSubscribe("allContacts");
  const isLoadingWallets = useSubscribe("wallets");
  const contacts = useFind(() => {
    return ContactsCollection.find({});
  });
  const [wallet] = useFind(() => WalletsCollection.find());

  if (isLoadingWallets() || isLoadingContacts()) {
    return <h4>Loading ...</h4>;
  }

  const sendMoney = () => {
    Meteor.call(
      "wallet.transaction",
      {
        amount,
        _id: wallet._id,
        isTranfering
      },
      (errorRes) => {
        if(errorRes){
          showError(errorRes.error);
        } else {
          showSuccess(isTranfering ? "Dinero enviado" : "Dinero agregado");
        }
      }
    )
    Meteor.call(
      "transactions.insert",
      {
        isTransfering: isTranfering,
        sourceWalletId: wallet._id,
        destinationWalletId: contactToSend?.number || "",
        amount: Number(amount),
      },
      (errorRes) => {
        if (errorRes) {
          showError(errorRes.error);
        } else {
          showSuccess(isTranfering ? "Dinero enviado" : "Dinero agregado");
          setModalShow(false);
          setContactToSend({});
          setAmount(0);
          setErrorMsg("");
        }
      }
    );
  };

  return (
    <>
      <Card className="m-5 p-3">
        {errorMsg && <ErrorAlert message={errorMsg} />}
        {successMsg && <SuccessAlert message={successMsg} />}
        <Container>
          <Row>
            <Col>
              <Row className="m-2 font-weight-light fs-4">Cuenta principal</Row>
              <Row className="m-2 font-weight-light fs-4">Wallet ID:</Row>
              <Row className="m-2">{wallet._id}</Row>
              <Row>
                <Col>
                  <Button
                    onClick={() => {
                      setModalShow(true);
                      setIsTranfering(false);
                    }}
                    variant="contained"
                  >
                    Agregar
                  </Button>
                  <Button
                    onClick={() => {
                      setModalShow(true);
                      setIsTranfering(true);
                    }}
                    variant="contained"
                    className="ml-3"
                  >
                    Tranferir
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className="text-center mx-auto mt-5">
              <h5>
                {wallet.balance} {wallet.currency}
              </h5>
            </Col>
          </Row>
        </Container>
      </Card>

      <ModalWallet
        state={modalShow}
        show={modalShow}
        title={
          isTranfering
            ? "Tranferir a un contacto"
            : "Tranferir dinero a mi billetera"
        }
        body={
          <>
            {isTranfering && (
              <div className="ml-4 mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Seleccionar contacto
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={contactToSend}
                    label="Seleccionar contacto"
                    onChange={(e) => setContactToSend(e.target.value)}
                  >
                    {contacts?.map((contact, idx) => (
                      <MenuItem value={contact} key={idx}>
                        {contact?.name || "Selecciona un contacto"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}
            <label className="ml-4" htmlFor="name">
              Valor:
            </label>
            <input
              className="rounded ml-2"
              type="number"
              id="numberAmount"
              value={amount}
              min={0}
              placeholder={0.0}
              onChange={(e) => setAmount(e.target.value)}
            />
          </>
        }
        footer={isTranfering ? "Tranferir" : "Agregar"}
        onHide={() => setModalShow(false)}
        sendmoney={sendMoney}
        contacts={contacts.length === 0 ? true : false}
      />
    </>
  );
};
