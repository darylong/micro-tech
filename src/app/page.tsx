"use client";

import { Button, Collapse, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [textArea, setTextArea] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/corrections");

    if (res.ok) {
      const { messages } = await res.json();
      setMessages(messages);
    } else {
      alert("Failed to fetch messages");
    }
    setLoading(false);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const submit = async (text: string) => {
    setSubmitting(true);
    const response = await fetch("/api/corrections", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const res = await response.json();
      const { message } = res;
      const { correctedMessage } = message;
      toast.success("Successfully corrected message!");
      setCorrectedText(correctedMessage);
    } else {
      toast.error("Failed to submit message");
    }
    await getMessages();
    setSubmitting(false);
  };

  return (
    <div className="py-10">
      <head>
        <title>Micro Tech</title>
      </head>
      <div className="w-full px-12 md:w-2/3 md:mx-auto space-y-4">
        {loading ? (
          <Spin spinning={loading} size="large" />
        ) : (
          <div className="bg-gray-100 rounded p-4 space-y-2">
            <h2>Total messages stored: {messages.length}</h2>

            <Collapse
              items={[
                {
                  key: "1",
                  label: "Corrected messages",
                  children: (
                    <div className="space-y-4">
                      {messages.map(
                        ({
                          id,
                          originalMessage,
                          correctedMessage,
                          createdAt,
                        }) => {
                          return (
                            <div
                              key={id}
                              className="flex justify-between bg-gray-300 rounded p-2 items-end"
                            >
                              <div className="flex flex-col">
                                <p className="font-thin">
                                  ❌ {originalMessage}
                                </p>
                                <p className="font-semibold">
                                  ✅ {correctedMessage}
                                </p>
                              </div>

                              <p>{new Date(createdAt).toDateString()}</p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        )}

        <TextArea
          placeholder="Enter sentence here"
          onChange={(e) => setTextArea(e.target.value)}
        />
        <Button
          onClick={() => submit(textArea)}
          loading={submitting}
          className="bg-yellow-500 rounded text-white font-semibold w-full"
        >
          Submit
        </Button>

        {correctedText && (
          <div className="space-y-2 text-center p-4 bg-gray-200 rounded">
            <h2 className="text-2xl font-semibold">Corrected version:</h2>
            <p className="">{correctedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
