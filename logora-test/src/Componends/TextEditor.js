import { Input, Button, Alert } from "antd";
import { useState } from "react";
import ListUsers from "./ListUsers";

const { TextArea } = Input;

const TextEditor = () => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [userData, setUserData] = useState([]);

  const findPredict = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type", 
      },
    };
    fetch(`https://moderation.logora.fr/predict?text=${text}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          
        setPrediction(result.prediction[0]);
        const userPrediction = {
          text: text,
          prediction: result.prediction[0] < 0.5 ? "accepted" : "rejected",
        };
        setUserData((oldUserData) => [...oldUserData, userPrediction]);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div style={{ width: 500, margin: "auto", marginTop: 100 }}>
        <h2>Logora Moderation prediction</h2>
        <TextArea rows={4} onChange={(e) => setText(e.target.value)} />
        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={() => findPredict()}>
            Send
          </Button>
        </div>
        <div>
          {prediction && (
            <div style={{ marginTop: 10 }}>
              {prediction < 0.5 ? (
                <Alert
                  message="Your contribution is accepted"
                  type="success"
                  showIcon
                />
              ) : (
                <Alert
                  message="Your contribution is rejected"
                  type="error"
                  showIcon
                />
              )}
            </div>
          )}
        </div>
      </div>
      {userData && <ListUsers userData={userData} />}
    </div>
  );
};

export default TextEditor;
