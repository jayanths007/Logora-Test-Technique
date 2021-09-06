import React, { useState } from "react";
import { Modal, Button } from "antd";

const GetScore = ({ text }) => {
  const [score, setScore] = useState("");

  const fetchScore = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "same-origin",
    };
    fetch(`https://moderation.logora.fr/score?text=${text}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setScore(result.score);
      })
      .catch((error) => console.log("error", error));
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    fetchScore();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Get Score
      </Button>
      <Modal
        title="Score Board"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>Your Score is: {score}</h2>
      </Modal>
    </div>
  );
};
export default GetScore;
