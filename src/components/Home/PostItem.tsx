import { PostCard } from "./PostCard";

interface Prop {
  item: any;
  profile?: boolean;
  bookmark?: boolean;
  comment?: boolean;
}

export const PostItem = ({ item, profile, bookmark, comment }: Prop) => {
  return (
    <PostCard
      id={item.id}
      avatar={
        item.user?.userImage || "https://robohash.org/stevejobs?bgset=bg2"
      }
      userName={item.user?.fullName}
      userHandle={item.user?.userName}
      desc={item.content}
      likeCount={10}
      commentCount={20}
      timestamp={item.createdAt}
      profile={profile}
      bookmark={bookmark}
      comment={comment}
    ></PostCard>
  );
};
