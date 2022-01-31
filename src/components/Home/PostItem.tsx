import { PostCard } from "./PostCard";

interface Prop {
  item: any;
  profile?: boolean;
  bookmark?: boolean;
}

export const PostItem = ({ item, profile, bookmark }: Prop) => {
  return (
    <PostCard
      id={item.id}
      avatar={item.user.imageUri}
      userName={item.user.name}
      userHandle={item.user.username}
      desc={item.content}
      likeCount={item.likeCount}
      comments={item.comments}
      timestamp={item.createdAt}
      profile={profile}
      bookmark={bookmark}
    ></PostCard>
  );
};
