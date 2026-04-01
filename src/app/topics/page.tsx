import { topics } from "@/mocks/topics";
import { currentUser } from "@/mocks/users";
import TopicsClient from "@/components/topic/TopicsClient";

// モックのログインユーザーID
const MY_USER_ID = currentUser.id;

const TopicsPage = () => {
  const myTopics = topics.filter((t) => t.userId === MY_USER_ID);

  return <TopicsClient initialTopics={myTopics} />;
};

export default TopicsPage;
