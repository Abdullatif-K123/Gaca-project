import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
export default function App({ Component, pageProps }) {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const handleToggleFeedback = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gaca.somee.com/api/landingpage/settings"
        );
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Cairo:wght@400;500;700&family=Fira+Code:wght@300;400;500;600;700&family=Montserrat:wght@100;200;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>GACA</title>
      </Head>

      <Layout
        isFeedbackVisible={isFeedbackVisible}
        handleToggleFeedback={handleToggleFeedback}
        conVersion={data}
      >
        <Component
          {...pageProps}
          isFeedbackVisible={isFeedbackVisible}
          handleToggleFeedback={handleToggleFeedback}
          conVersion={data}
        />
      </Layout>
    </>
  );
}
