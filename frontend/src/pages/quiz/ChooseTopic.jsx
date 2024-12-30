import { Box, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OptionsBox from "../../components/OptionsBox";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ErrorPage from "../ErrorPage";
import CustomSpinner from "../../components/CustomSpinner";
import { fetchTopicsOfCategory } from  "../../api/api"

const ChooseTopic = () => {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const { selectedCategoryId, setSelectedTopicId, setSelectedTopic, token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTopicsOfCategory(token, selectedCategoryId);
        setTopics(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [token, selectedCategoryId]);

  const onTopicSelected = (topic) => {
    setSelectedTopicId(topic.topic_id)
    setSelectedTopic(topic.topic_name)

    navigate(`${topic.topic_name}`);
  };

  if (isError) {
    return <ErrorPage />
  }
  else if (isLoading) {
    return <CustomSpinner />
  }
  else {
    return (
      <Box pt={3} width={"100%"}>
        <Typography
          fontSize={"1.3rem"}
          sx={{
            textShadow: "-0.08em 0.03em 0.12em rgba(0, 0, 0, 0.9)",
            fontWeight: "lighter",
          }}
          pt={1}
        >
          CHOOSE TOPIC
        </Typography>
        <Divider sx={{ borderColor: "whitesmoke", my: 4 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={4}>
          {topics.map((topic) => (
            <OptionsBox
              key={topic.topic_id}
              option={topic.topic_name}
              onOptionChosen={() => onTopicSelected(topic)}
            />
          ))}
        </Box>
      </Box>
    );
  };
}

export default ChooseTopic;
