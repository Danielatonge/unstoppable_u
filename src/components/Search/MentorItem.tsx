import { MentorCard } from "./MentorCard";

export const MentorItem = ({ user }) => {
  return (
    <MentorCard
      id={user.id}
      avatar={user.imageUri}
      userName={user.name}
      userHandle={user.username}
      achievement={user.achievement}
      likeCount={user.likeCount}
      followCount={user.followCount}
      tags={user.tags}
    ></MentorCard>
  );
};
